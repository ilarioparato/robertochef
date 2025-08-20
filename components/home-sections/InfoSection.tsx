import { SITE_PADDING } from "@/src/app/constants";
import InfoCard from "../cards/InfoCard";

// I dati per le carte informative
const CARDS_DATA = [
  {
    title: "The Service",
    features: [
      { text: "Home-cooking", bold: true },
      { text: "Cleaning service", bold: false },
      { text: "Table Service", bold: true },
      { text: "Groceries included", bold: false },
      { text: "Drinks on request", bold: true }
    ],
    infoText: "Our Private Cooking Classes at Home service takes care of everything: from grocery shopping to cooking, table service, and leaving your kitchen spotless. Drinks are not included but can be added at checkout. We only ask that the kitchen is in acceptable condition and not crowded during the service.",
    centerOnTablet: false,
  },
  {
    title: "The Class",
    features: [
      { text: "Final Certificate", bold: false },
      { text: "Aprons, Chef hat", bold: true },
      { text: "Chef receipts", bold: false },
      { text: "Full meal service", bold: true },
      { text: "Step by step class", bold: false }
    ],
    infoText: "Guided directly by the Chef, you'll receive aprons, a chef's hat, and printed recipes to keep. At the end, the Chef awards a certificate in advanced Italian cooking. The meal you prepare together is completed with a served antipasto and a dessert for a full dining experience.",
    centerOnTablet: true,
  },
  {
    title: "The Attention",
    features: [
      { text: "Allergen aware", bold: true },
      { text: "Vegan options", bold: false },
      { text: "Pregnancy friendly", bold: true },
      { text: "Kids options", bold: false },
      { text: "Pre service payment", bold: true }
    ],
    infoText: "During checkout, guests can specify dietary needs, pregnancy considerations, or kids' adaptations. These will be applied to the full menu, visible for each class in the \"Classes\" section of the website. Payment is required at booking for the chosen date and time.",
    centerOnTablet: false,
  }
];

export default function InfoSection() {
  return (
    <section className={`relative ${SITE_PADDING} py-16 md:py-24`}>
      {/* Ridotto lo spazio tra titolo e grid da mb-12/16 a mb-8/10 */}
      <div className="text-left mb-8 md:mb-10">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white">
          Your class, made simple.
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {CARDS_DATA.map((card) => (
          <InfoCard
            key={card.title}
            title={card.title}
            features={card.features}
            infoText={card.infoText}
            centerOnTablet={card.centerOnTablet}
          />
        ))}
      </div>
    </section>
  );
}