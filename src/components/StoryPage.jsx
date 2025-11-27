import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const storyData = [
  {
    id: 1,
    titleTop: "RUNWAY EXCLUSIVE",
    titleBig: "VOGUE x BEAUTÉ",
    description: "Zarafet, modern dokunuşlarla yeniden tanımlanıyor.",
    image: "/images/login.jpg",
    content: `
Paris moda haftasının kulislerinden çıkan en büyüleyici kareler...
Minimalizmin haute couture ile birleştiği bu sezonda, sadelik yeni lüks olarak tanımlanıyor.

Pastel tonlar, doğal makyaj ve maskülen-feminen çizgiler zarafetin yepyeni bir tanımını sunuyor.

Bu sadece moda değil; bir özgüven manifestosu.
    `,
  },
  {
    id: 2,
    titleTop: "PARIS FASHION WEEK",
    titleBig: "HAUTE COUTURE",
    description: "Zarafet yeniden tanımlanıyor.",
    image: "/images/2.jpg",
    content: `
Paris'te bu sezon couture sahnesi, dramatik silüetler ve cesur dokularla yeniden doğuyor...
Tül, siyah beyaz kontrastlar ve heykelsi güzellikler podyuma taşınıyor.
    `
  },
  {
    id: 3,
    titleTop: "EDITORIAL BEAUTY",
    titleBig: "ART OF BEAUTY",
    description: "Minimalizm ve modern kadın estetiği.",
    image: "/images/3.jpg",
    content: `
Güzellik artık yalnızca bir görünüş değil; zarafet, güç ve özgünlüğün birleşimidir.
Fotoğraflar, ışığın ve gölgenin zarif bir dansını yansıtıyor.
    `
  }
];

export default function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = storyData.find((item) => item.id === Number(id));

  if (!story)
    return <p className="pt-[120px] text-center">Story bulunamadı.</p>;

  return (
    <div className="w-full min-h-screen bg-white text-black pt-[100px]">
      <div className="max-w-5xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-black text-sm tracking-widest"
        >
          ← Geri
        </button>
      </div>

      <div className="max-w-5xl mx-auto mt-10 px-6">
        <img
          src={story.image}
          alt={story.titleBig}
          className="w-full h-[500px] md:h-[600px] object-cover rounded-md shadow-md"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center mt-10 px-6">
        <p className="uppercase text-gray-500 tracking-[4px] text-xs font-luxury">
          {story.titleTop}
        </p>
        <h1 className="text-4xl md:text-6xl font-vogue tracking-wide leading-snug mt-3">
          {story.titleBig}
        </h1>
        <p className="text-gray-500 mt-5">{story.description}</p>
      </div>

      <div className="max-w-3xl mx-auto mt-12 px-6 pb-20 border-b border-gray-200">
        <p className="text-[15px] leading-8 whitespace-pre-line font-light font-sans">
          {story.content}
        </p>
      </div>
    </div>
  );
}
