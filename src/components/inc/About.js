function About(props) {
  return (
    <div id="about">
      <section className="section bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h3 className="main-heading">Who We Are</h3>
              <div className="underline mx-auto"></div>
              <p className="mt-3">
                We are a passionate team with a clear goal. We offer a one-stop
                platform that help entrepreneurs develop their ideas into fully
                operational businesses through offering a full stack patch of
                services.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-3 text-center">
              <div className="member m1 mx-auto"></div>
              <div>
                <h3 className="color-red fw-bold">Mostafa Hisham</h3>
                <h5>CTO & Co-Founder</h5>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="member m2 mx-auto"></div>
              <div>
                <h3 className="color-red fw-bold">Mohamed Marei, CFA</h3>
                <h5>CEO & Co-Founder</h5>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="member m3 mx-auto"></div>
              <div>
                <h3 className="color-red fw-bold">Taher Seif, CFA</h3>
                <h5>Co-Founder</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
