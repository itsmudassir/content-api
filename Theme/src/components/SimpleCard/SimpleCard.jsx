const SimpleCard = ({title, desc, image}) => {
  return (
    <>
      <div className="mb-8">
        <div className="w-full rounded overflow-hidden border border-t-0 md:h-96 lg:h-56 hover:shadow-lg">
          <img className="ml-5 w-10 h-10" src={image}/>
          <div className="px-6 py-4">
            <div className="font-bold text-md mb-2">{title}</div>
            <p className="text-gray-700 text-sm">
              {desc}
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SimpleCard;
