function Vmc(props) {
  return (
    <div id="vmc">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4 text-center">
              <h3 className="main-heading">Vision, Mission and Values</h3>
              <div className="underline mx-auto"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://xpovi-media.s3.eu-central-1.amazonaws.com/home+page/vision.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <div className="card-text text-center">
                  <h2 className="text-center color-red">VISION</h2>
                  Bridge large enterprises tool kits to startups feasibly and
                  efficiently.
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="https://xpovi-media.s3.eu-central-1.amazonaws.com/home+page/mission.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <div className="card-text text-center">
                  <h2 className="text-center color-red">MISSION</h2>
                  Enable startups to achieve financial literacy and reliably
                  reach full potential.
                </div>
              </div>
            </div>
            <div className="col-md-6 offset-md-3">
              <img
                src="https://xpovi-media.s3.eu-central-1.amazonaws.com/home+page/values.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <div className="card-text text-center">
                  <h2 className="text-center color-red">VALUES</h2>Xpovi blends
                  its cutting-edge technology with integrity, reliability, and
                  efficiency to guarantee our clientele satisfaction is at the
                  heart of business.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Vmc;
