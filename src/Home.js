import Title from "./components/Title";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="Home">
      <Title name="Meerkat" />
      <br />
      <h4>Protecting the computing community</h4>
      <br />
      <span>
        <Link to="/About">About</Link> | <Link to="/Tools">Tools</Link> |{" "}
        <Link to="/Downloads">Downloads</Link>
      </span>
    </div>
  );
}

export default Home;
