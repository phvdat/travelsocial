import { Link } from "react-router-dom";
import { RoutePath } from "router/routePath";
import './NotFoundStyle.scss'
const NotFoundPage = () => {
	return (
		<div className="not-found-page">
			<h2>Oops!</h2>
			<h3>404 Not Found</h3>
			<Link to={RoutePath.Home}> Trở về trang chủ</Link>
		</div>
	);
};

export default NotFoundPage;
