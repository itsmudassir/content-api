import ButtonPrimary from "../Button/ButtonPrimary";
import { useHistory } from "react-router-dom";

const UnauthorizeMobileNavItems = ({ onClickClose }) => {
  const history = useHistory();

  return (
    <ul className="w-full py-5">
      <li>
        <ButtonPrimary
          onClick={() => {
            onClickClose();
            history.push(`register`);
          }}
          className="ml-5 mb-2"
        >
          Start your free trial
        </ButtonPrimary>
      </li>
      <li className="px-3">
        <button
          onClick={() => {
            onClickClose();
            history.push(`login`);
          }}
          className="w-full hover:bg-slate-100 font-semibold py-3 rounded text-left pl-5"
        >
          Sign in
        </button>
      </li>
      <li className="px-3">
        <button
          onClick={() => {
            onClickClose();
            history.push(`subscription`);
          }}
          className="w-full hover:bg-slate-100 font-semibold py-3 rounded text-left pl-5"
        >
          Subscription
        </button>
      </li>
      <li className="px-3">
        <button
          onClick={() => {
            onClickClose();
            history.push(`contact-us`);
          }}
          className="w-full hover:bg-slate-100 font-semibold py-3 rounded text-left pl-5"
        >
          Contact us
        </button>
      </li>
    </ul>
  );
};
export default UnauthorizeMobileNavItems;
