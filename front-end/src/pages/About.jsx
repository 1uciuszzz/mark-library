import {
  FaGithub,
  FaBlog,
  FaReact,
  FaJsSquare,
  FaPython,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="card bg-primary rounded-md text-secondary-content p-2">
      <div className="card-body">
        <h3 className="card-title text-2xl font-bold">About</h3>
        <article className="flex flex-col gap-2">
          <h4 className="text-lg flex items-center gap-2">
            <FaReact size={24} />
            Marka:书签管理平台
          </h4>
          <p className="flex items-center gap-2">
            <FaJsSquare size={24} />
            前端所用主要技术栈:
          </p>
          <div className="mockup-code">
            <pre>
              <code>"react": "^18.0.0",</code>
            </pre>
            <pre>
              <code>"react-dom": "^18.0.0",</code>
            </pre>
            <pre>
              <code>"react-icons": "^4.3.1",</code>
            </pre>
            <pre>
              <code>"react-router-dom": "^6.3.0",</code>
            </pre>
            <pre>
              <code>"react-toastify": "^8.2.0"</code>
            </pre>
            <pre>
              <code>"@uiball/loaders": "^1.2.4",</code>
            </pre>
            <pre>
              <code>"axios": "^0.27.0",</code>
            </pre>
            <pre>
              <code>"tailwindcss": "^3.0.24",</code>
            </pre>
            <pre>
              <code>"daisyui": "^2.14.2",</code>
            </pre>
          </div>
          <p className="flex items-center gap-2">
            <FaPython size={24} />
            后端所用主要技术栈:
          </p>
          <div className="mockup-code">
            <pre>
              <code>fastapi</code>
            </pre>
            <pre>
              <code>uvicorn</code>
            </pre>
            <pre>
              <code>sqlalchemy</code>
            </pre>
            <pre>
              <code>pydantic</code>
            </pre>
            <pre>
              <code>python-jose</code>
            </pre>
            <pre>
              <code>passlib</code>
            </pre>
            <pre>
              <code>psycopg2</code>
            </pre>
            <pre>
              <code>python-multipart</code>
            </pre>
          </div>
        </article>
        <div className="card-actions justify-end">
          <a
            className="btn shadow-md"
            target="_blank"
            href="https://1uciuszzz.github.io"
          >
            <FaBlog size={24} />
          </a>
          <a
            className="btn shadow-md"
            target="_blank"
            href="https://github.com/1uciuszzz"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
