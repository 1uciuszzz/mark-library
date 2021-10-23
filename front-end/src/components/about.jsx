import React from "react";

const About = () => {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="nes-container is-rounded is-dark" id="aboutContainer">
          <section className="message-list">
            <section className="message -left row justify-content-around">
              <i className="nes-bcrikko col-4"></i>
              <div className="nes-balloon from-left is-dark col-8">
                <h3 className="nes-text is-warning">
                  Welcome to the Mark Library
                </h3>
              </div>
            </section>
            <section className="message -right row justify-content-around">
              <div className="nes-balloon from-right is-dark col-8">
                <h5>
                  这里收集了各种各样的书签,包括日常使用频率高的、学习资源、背景素材、配色推荐、设计灵感、效率工具......
                </h5>
              </div>
              <i className="nes-bcrikko col-4"></i>
            </section>
          </section>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <i className="nes-octocat animate col-3"></i>
          <div className="nes-badge col-5">
            <span className="is-dark">Members</span>
          </div>
        </div>
        <div className="nes-container is-centered">
          <div className="row justify-content-around">
            <h2 className="col-4 nes-btn is-disabled">李好</h2>
            <h2 className="col-4 nes-btn is-disabled">吕思羽</h2>
          </div>
          <div className="row">
            <center>
              <h2 className="nes-btn is-disabled col-4">赵力行</h2>
            </center>
          </div>
          <div className="row justify-content-around">
            <h2 className="col-4 nes-btn is-disabled">毛苗</h2>
            <h2 className="col-4 nes-btn is-disabled">梁茜琳</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
