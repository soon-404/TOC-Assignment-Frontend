import { AxiosInstance } from 'axios'
import { ApiTablesData, ClassYear, Course, SortField } from 'types'
import { httpClient } from 'api/httpClient'

class CourseService {
  private _httpClient: AxiosInstance

  constructor(_httpClient: AxiosInstance) {
    this._httpClient = _httpClient
  }

  public getAllCourse = async (): Promise<Course[]> => {
    const {
      data: { data: _courses, success },
    } = await this._httpClient.get<ApiTablesData>('/tables')

    if (!success) {
      throw new Error('fetch all courses error')
    }

    return _courses
  }

  public getCourseByClassYear = async (classYear: ClassYear): Promise<Course[]> => {
    const {
      data: { data: _courses, success },
    } = await this._httpClient.get<ApiTablesData>('/tables', { params: { class_year: classYear, sorted_by: 'name' } })

    if (!success) {
      throw new Error(`fetch pee ${classYear} courses error`)
    }

    return _courses
  }

  public getCourseById = async (id: string): Promise<Course[]> => {
    const {
      data: { data: _courses, success },
    } = await this._httpClient.get<ApiTablesData>('/tables', {
      params: { id: id },
    })

    if (!success) {
      throw new Error(`fetch courses by id '${id}' error`)
    }

    return _courses
  }

  public getCurrentSort = async (sortBy: SortField, classYear: ClassYear): Promise<Course[]> => {
    const {
      data: { data: _courses, success },
    } = await this._httpClient.get<ApiTablesData>('/tables', {
      params: { sorted_by: sortBy, class_year: classYear },
    })

    if (!success) {
      throw new Error(`sort error fleid = (${sortBy})`)
    }

    return _courses
  }

  public getCourseByKeyword = async (keyword: string, sortBy: SortField): Promise<Course[]> => {
    try {
      const _course = await this.getCourseById(keyword)
      if (!!_course.length) {
        return _course
      }
    } catch (e) {
      console.error(e)
      return []
    }

    const {
      data: { data: _courses, success },
    } = await this._httpClient.get<ApiTablesData>('/tables', {
      params: { name: keyword, sorted_by: sortBy },
    })

    if (!success) {
      throw new Error(`fetch courses by keyword '${keyword}' error`)
    }

    return _courses
  }
}

export const courseService = new CourseService(httpClient)
