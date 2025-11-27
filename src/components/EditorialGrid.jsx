// src/components/EditorialGrid.jsx
import React from "react";
import { motion } from "framer-motion";

const editorials = [
  {
    id: 1,
    eyebrow: "RUNWAY MOMENT",
    title: "Paris Gece Işıkları",
    description:
      "Soft smokey göz makyajı ve parlak dudaklarla tam bir runway dengesi.",
    image: "/images/lipstick.jpg",
  },
  {
    id: 2,
    eyebrow: "BACKSTAGE ROUTINE",
    title: "5 Dakikalık Cilt Hazırlığı",
    description:
      "Serum, nemlendirici ve aydınlatıcı üçlüsüyle çekim öncesi hızlı hazırlık.",
    image: "/images/fn.jpg",
  },
  {
    id: 3,
    eyebrow: "COLOR STORY",
    title: "Monochrome Nude",
    description:
      "Göz, dudak ve yanaklarda aynı tonlarla minimal ama sofistike bir görünüm.",
    image: "/images/mascara.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -6, scale: 1.02 },
};

export default function EditorialGrid() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
            EDITORIAL STORIES
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-vogue tracking-[0.18em]">
            Behind The Beauté
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {editorials.map((item, index) => (
            <motion.article
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-80" />
                <div className="absolute left-4 bottom-4 bg-white/85 backdrop-blur-sm px-3 py-2 rounded-xl border border-black/5">
                  <p className="font-signature text-xl leading-none text-black">
                    Beauté
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
                  {item.eyebrow}
                </p>
                <h3 className="text-lg font-vogue tracking-[0.12em]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
