import Image from "next/image";

function Sidebar() {
  return (
    <div className="hidden lg:block shrink-0 w-60 border-r border-black h-screen px-4 py-6">
      <div>
        {/* Logo */}
        <p className="flex gap-0.5 items-center">
          <span className="p-2">
            <Image
              src={"./icons/logo.svg"}
              alt="Submit button arrow"
              width={18}
              height={18}
              className="object-contain"
            />
          </span>
          <span>Chat AI</span>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
