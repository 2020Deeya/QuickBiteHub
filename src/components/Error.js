import {useRouteError, Link} from 'react-router-dom';
const Error = () => {
  const err = useRouteError();
  return (
    <div className="error-page">
        <h1>Oops! {err.data}</h1>
        <Link to='/'>Back to Home</Link>
    </div>
  )
}
export default Error;
