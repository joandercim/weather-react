function Modal({ className }) {
  return (
    <div className={className}>
    <i className="fa-solid fa-xmark"></i>
    <div className="information">
      <h1>Falköping</h1>
      <div className="city-info">
        <p>
        </p>
      </div>
    </div>
    <div className="widget-container">
      <div className="widget">
        <p className="widget-heading">Air Temp</p>
        <div className="circle">
          <span className="num" id="air-temp">0</span>
          <p>°C</p>
        </div>
      </div>

      <div className="widget">
          <p className="widget-heading">Wind speed</p>
        <div className="circle">
          <span className="num" id="wind-speed">0</span>
          <p>m/s</p>
        </div>
      </div>
      <div className="widget">
          <p className="widget-heading">Precipitation intensity</p>
        <div className="circle">
          <span className="num" id="pricipitation">0</span>
          <p>mm/h</p>
        </div>
      </div>
      <div className="widget">
          <p className="widget-heading">Thunder probability</p>
        <div className="circle">
          <span className="num" id="thunder-prob">0</span>
          <p className="widget-heading">%</p>
        </div>
      </div>
      <div className="widget">
        <p className="widget-heading">Horizontal visibility</p>
      <div className="circle">
        <span className="num" id="visibility">0</span>
        <p className="widget-heading">km</p>
      </div>
    </div>
    </div>
  </div>
  )
}
export default Modal