import { Button } from "@material-ui/core";

const CustomButton = ({ handleOpen, AddCircleOutlined }) => {
  return <Button onClick={handleOpen}>{AddCircleOutlined} Add User</Button>;
};

export default CustomButton;
