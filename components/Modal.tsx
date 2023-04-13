export default function Modal({
  children,
  title,
  isOpen,
  onClose,
  titleSize = "text-xl",
  alwaysOpen = false
}: any) {
  return (
    <>
      {/* background */}
      <div
        className={`modal-bg ${isOpen ? "" : "hide-component"}`}
        onMouseDown={!alwaysOpen ? onClose : () => {}}
      >
        {/* card */}
        <div className="modal-card" onMouseDown={(e) => (!alwaysOpen ? e.stopPropagation() : {})}>
          {children}
        </div>
      </div>
    </>
  );
}

//   {/* background */}
//   <div
//     className={`${
//       isOpen ? "" : "hidden"
//     } fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-[#232323aa] z-50`}
//     onMouseDown={!alwaysOpen ? onClose : () => {}}
//   >
// {/* card */}
// <div
//   className="relative rounded-lg p-2 w-3/4 top-10 mx-auto bg-[#FFFFFF] mb-[15vh]"
//   onMouseDown={(e) => (!alwaysOpen ? e.stopPropagation() : {})}
// >
//   <div className="rounded-lg">
//     <div className="flex flex-col items-center space-y-4 md:space-y-6 sm:p-8"></div>
//     <div className={`${titleSize} py-2 font-bold text-center`}>{title}</div>
//     {/* <VerticalSpace /> */}
//     {children}
//   </div>
// </div>
//   </div>
