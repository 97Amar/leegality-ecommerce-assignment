import "./Error.css";

interface IProps{
    message:string
}
const Error = ({ message }: IProps) => {
  return (
    <div className="error">
      {message}
    </div>
  );
};

export default Error;