import { useState } from "react";
import { Link } from "react-router-dom";

function Congratulations() {
  const [isHidden, setIsHidden] = useState(false);

  // Background images from public/background directory - use base URL for GitHub Pages
  const BASE_URL = import.meta.env.BASE_URL;
  const backgroundImages = [
    `${BASE_URL}background/IMG_1175.jpg`,
    `${BASE_URL}background/IMG_1176.jpg`,
    `${BASE_URL}background/IMG_1177.jpg`,
    `${BASE_URL}background/IMG_1178.jpg`,
    `${BASE_URL}background/IMG_1179.jpg`,
    `${BASE_URL}background/IMG_1180.jpg`,
    `${BASE_URL}background/IMG_1181.jpg`,
    `${BASE_URL}background/IMG_1182.jpg`,
    `${BASE_URL}background/IMG_1183.jpg`,
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image collage */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full">
          {backgroundImages.map((img, index) => {
            // Replace 8th image (index 7) with MP4 video
            if (index === 7) {
              return (
                <div key={index} className="relative overflow-hidden">
                  <video
                    autoPlay
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      pointerEvents: "none",
                    }}
                  >
                    <source
                      src={`${BASE_URL}music/happy-birthday-bongo-cats.mp4`}
                      type="video/mp4"
                    />
                  </video>
                </div>
              );
            }
            return (
              <div
                key={index}
                className="relative overflow-hidden"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(1px)",
                }}
              />
            );
          })}
        </div>
        {/* Greenish overlay with low opacity */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-green-700/20"></div>
      </div>

      {/* Hide/Show button */}
      <button
        onClick={() => setIsHidden(!isHidden)}
        className="absolute top-4 right-4 px-4 py-2 bg-white/80 backdrop-blur-md text-gray-800 rounded-lg font-semibold hover:bg-white transition-all shadow-lg z-50"
      >
        {isHidden ? "Pokaż" : "Ukryj"}
      </button>

      {/* Content */}
      {!isHidden && (
        <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
          <div
            className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl text-center overflow-hidden flex flex-col"
            style={{
              width: "738px",
              height: "632px",
              padding: "48px",
            }}
          >
            <div className="mb-8 flex-shrink-0">
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                🎉 Happy Birthday! 🎉
              </h1>
              <div className="text-4xl mb-6">🐴</div>
            </div>

            {/* Scrollable text section only - takes available space */}
            <div className="overflow-y-auto pr-2 flex-1 min-h-0">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed gap-4 flex flex-col text-start mt-4">
                <p>
                  Hej mój kochany
                  <b> Hobbicie</b>! 🎉💚❄️
                </p>
                <p>
                  Gratuluję Ci rozwiązania zagadki! 💙 Możesz też podziękować
                  Łukaszowi, to on stworzył tę stronkę i ukrył w niej całą
                  magię. A ja dziękuję za inspirację listem, który od Ciebie
                  dostałam, bo bez niego pewnie wyszedłby mi jakiś nudny tekst
                  bez nutki szaleństwa i kreatywnego myślenia. Ale do rzeczy…
                  czyli Twoich urodzin!
                </p>
                <div>
                  <p>Masz dziś 28 urodziny!!! Aaaa! 😍✨</p>
                  <p>
                    Niech Ci ten dzień będzie jak najlepsza jazda konna, lekki,
                    radosny, pełen wolności i tego pięknego uczucia, które
                    czujesz, gdy pędzisz dokładnie tam, gdzie chcesz. 🐎
                  </p>
                  <p>
                    Zamiast słońca życzę Ci dzisiaj magicznego, miękkiego
                    śniegu, skrzypiącego pod butami i robiącego świat
                    piękniejszym, bo wiem, jak bardzo kochasz zimowy klimat.
                    Jeśli nie w Polsce, niech Twoje podróże zaprowadzą Cię do
                    Skandynawii, Islandii lub Kanady, gdzie śnieg i przygoda
                    czekają na każdym kroku. ❄️✨
                  </p>

                  <p>
                    A apropos podróży, życzę Ci ich wielu. Zarówno tych
                    bliskich, jak i dalekich, tych spontanicznych tuż za róg,
                    jak i wielkich wypraw, które zostają w sercu na zawsze. 🌍💼
                  </p>
                  <p>
                    I oczywiście mnóstwo pięknych chwil, takich które się
                    pamięta, bo były pełne śmiechu, wygłupów i dobrego vibe'u.
                    Mam nadzieję, że dużą część z nich spędzisz jeszcze ze mną.
                    💚
                  </p>
                  <p>
                    Chcę Ci też życzyć, aby Twoja odwaga nigdy nie zgasła. Masz
                    w sobie tę wyjątkową iskrę, która pcha Cię do próbowania
                    nowych rzeczy, odkrywania świata i robienia wszystkiego po
                    swojemu. Niech ta odwaga zawsze prowadzi Cię tam, gdzie
                    poczujesz się najszczęśliwsza. W końcu życie jest jedno,
                    więc dawaj sobie to, na co zasługujesz, nigdy mniej! 💫
                  </p>
                  <p>
                    I koniecznie czekam na Twoją szczerą recenzję tölta, bo
                    wiem, że jak Ty coś opiszesz, to ja już to widzę oczami
                    wyobraźni. Obyś spróbowała jak najszybciej 🐎✨
                  </p>
                </div>
                <div>
                  <p>A teraz mała urodzinowa refleksja 💚</p>
                  <p>
                    <i>
                      Jakie małe radości w życiu sprawiają, że czujesz się
                      naprawdę szczęśliwa?
                    </i>
                    Odpowiedź sobie i świadomie zacznij wcielać je częściej w
                    życie.
                  </p>
                </div>
                <p>
                  Ściskam Cię najmocniej i posyłam kilogramy urodzinowej
                  energii! 💚❄️
                </p>
                <p>
                  To jak, będą dzisiaj paczki, lody czy jakieś pyszne pancakes?
                  🍩🍨🥞
                </p>
              </div>
            </div>

            {/* Button always at bottom */}
            <div className="mt-8 flex-shrink-0">
              <Link
                to="/"
                className="inline-block px-8 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-all"
              >
                ← Go Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Congratulations;
