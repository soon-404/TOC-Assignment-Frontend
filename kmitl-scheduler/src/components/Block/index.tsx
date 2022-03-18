import { Box } from "@mui/material";

const styles = {
  box: {
    width: 200,
    height: 100,
  },
};

interface TimeBlockProps {
  aref: React.RefObject<Element>;
}
export default function TimeBlock(props: TimeBlockProps) {
  const { aref } = props;
  return <Box sx={styles.box} ref={aref} />;
}
