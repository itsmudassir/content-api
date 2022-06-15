
import alertConfirm from "react-alert-confirm";

const confirmAlert = (title, callback)=>{
    alertConfirm({
        // title: "Alert!",
        style: { borderRadius: "10px" },
        maskClosable:true,
        content: title,
        footer(dispatch) {
          return (
            <>
              <button
                className="px-6 py-3 text-black bg-slate-200 hover:bg-slate-300 rounded-full"
                onClick={() => dispatch("cancel")}
              >
                No
              </button>
              <button
                className="px-6 py-3 text-white bg-primary-6000 hover:bg-primary-700 rounded-full"
                onClick={async () => {
                    callback();
                  dispatch("cancel");
                }}
              >
                Yes
              </button>
            </>
          );
        },
      });
};


export default confirmAlert;