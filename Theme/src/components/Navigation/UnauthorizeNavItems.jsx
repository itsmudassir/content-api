import ButtonPrimary from "../Button/ButtonPrimary";
import ButtonSecondary from "../Button/ButtonSecondary";
import { useHistory } from "react-router-dom";

const UnauthorizeNavItems = () => {
  const history = useHistory();
  return (
    <div className="flex justify-between w-full">
      <ul className="nc-Navigation  hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 justify-between relative">
        <li>
          <ButtonSecondary
            onClick={() => history.push(`contact-us`)}
            className="border-0"
          >
            Contact us
          </ButtonSecondary>
        </li>
        <li>
          <ButtonSecondary
            onClick={() => history.push(`subscription`)}
            className="border-0"
          >
            Subscription
          </ButtonSecondary>
        </li>
      </ul>

      <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 justify-between relative">
        <li>
          <ButtonSecondary onClick={() => history.push(`login`)} className="">
            Sign in
          </ButtonSecondary>
        </li>
        <li>
          <ButtonPrimary onClick={() => history.push(`register`)} className="ml-2">
            Start your free trial
          </ButtonPrimary>
        </li>
      </ul>
    </div>
  );
};
export default UnauthorizeNavItems;
