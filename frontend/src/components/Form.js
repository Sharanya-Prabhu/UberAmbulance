import {
  faHospital,
  faLocationDot,
  faTriangleExclamation,
  faLocationCrosshairs
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import CompletePlaces from './CompletePlaces';


const Form = () => {
  return (
    <div className="card">
      <div className="card-heading">Get a ride</div>
      <div>
        <div className="user-input">
          <div className="input-icon">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <input
            id="search-input"
            type="text"
            placeholder="Pickup location"
            size="50"
          ></input>

          {/* <CompletePlaces/> */}
        </div>

        <div className="radio-cur-loc">
          <button id = "use-curr-loc" >
            <FontAwesomeIcon icon={faLocationCrosshairs} />  Use current location
          </button>
        </div>

        <div className="user-input">
          <div className="input-icon">
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </div>
          <select required>
            <option value="" disabled selected>
              {" "}
              Emergency
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>

        <div className="user-input">
          <div className="input-icon">
            <FontAwesomeIcon icon={faHospital} />
          </div>
          <select id="hospital-select" required>
            <option value="" disabled selected>
              {" "}
              Select Hospital
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
      </div>

      <button className="confirm-btn">Confirm</button>
    </div>
  );
};

export default Form;
