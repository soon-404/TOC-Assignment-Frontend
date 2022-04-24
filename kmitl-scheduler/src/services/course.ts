import { AxiosInstance } from 'axios'
import { ApiTablesData, ClassYear, Course } from 'types'
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
    } = await this._httpClient.get<ApiTablesData>('/tables', { params: { class_year: classYear } })

    if (!success) {
      throw new Error(`fetch pee ${classYear} courses error`)
    }

    return _courses
  }

  public getCourseByKeyword = async (keyword: string): Promise<Course[]> => {
    const {
      data: { data: _courses, success },
    } = await this._httpClient.get<ApiTablesData>('/tables', { params: { name: keyword, id: keyword } })

    if (!success) {
      throw new Error(`fetch courses by keyword '${keyword}' error`)
    }

    return _courses
  }
}

export const courseService = new CourseService(httpClient)
