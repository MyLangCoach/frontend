import { ActiveCircle, EmptyCircle } from "../../assets";

const Radio = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="" onClick={onClick}>
      {active ? <ActiveCircle /> : <EmptyCircle />}
    </div>
  );
};

export default Radio;
