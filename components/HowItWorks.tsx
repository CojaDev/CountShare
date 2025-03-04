import { Clock, Share2, Bell } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Create Countdowns",
    description: "Easily set up personalized countdowns for any event.",
  },
  {
    icon: Share2,
    title: "Share with Friends",
    description: "Invite others to view and celebrate together.",
  },
  {
    icon: Bell,
    title: "Get Notified",
    description: "Receive timely alerts as your moments approach.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#152932] text-white py-20 px-6 mt-10">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">How CountShare Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center px-5 py-8 bg-[#1c3b47] rounded-xl shadow-lg transition-transform duration-300"
            >
              <div className="bg-[#00c2cb] p-4 rounded-full mb-4 shadow-md">
                <feature.icon className="w-10 h-10 text-[#152932]" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
