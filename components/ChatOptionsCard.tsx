import Image from "next/image";

const chatOptions = [
  {
    id: 1,
    icon: (
      <Image
        src={"/icons/emailIcon.svg"}
        alt="Email icon"
        width={20}
        height={20}
      />
    ),
    title: "Draft email",
    description: "Generate email for any occasion you need.",
    backgroundColor: "bg-indigo-50",
  },
  {
    id: 2,
    icon: (
      <Image
        src={"/icons/writeIcon.svg"}
        alt="Writing icon"
        width={20}
        height={20}
      />
    ),
    title: "Write an Essay",
    description: "Generate essay for any occasion you need.",
    backgroundColor: "bg-green-50",
  },
  {
    id: 3,
    icon: (
      <Image
        src={"/icons/planIcon.svg"}
        alt="Planning icon"
        width={20}
        height={20}
      />
    ),
    title: "Planning",
    description: "Plan for any occasion, from holiday to family.",
    backgroundColor: "bg-fuchsia-50",
  },
  {
    id: 4,
    icon: (
      <Image
        src={"/icons/assistantIcon.svg"}
        alt="Assistant icon"
        width={20}
        height={20}
      />
    ),
    title: "Assistant",
    description: "Become your personal assistant. Helping you.",
    backgroundColor: "bg-amber-50",
  },
];

function ChatOptionsCard() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {chatOptions.map(({ id, icon, title, description, backgroundColor }) => (
        <div key={id} className="flex flex-col gap-6 border rounded-lg p-4">
          <div className="flex">
            <div className={`bg-secondary p-2.5 rounded-lg ${backgroundColor}`}>
              {icon}
            </div>
          </div>
          <div>
            <p className="text-foreground text-sm font-semibold mb-2">
              {title}
            </p>
            <p className="text-muted-foreground text-xs font-normal">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatOptionsCard;
