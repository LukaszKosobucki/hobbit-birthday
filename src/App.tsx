import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

// MP3 file paths in public/music folder - use base URL for GitHub Pages
const BASE_URL = import.meta.env.BASE_URL;
const FIRST_SONG = `${BASE_URL}music/wham-last-christmas-official-video-128-ytshorts.savetube.me.mp3`; // First song (Last Christmas)
const SECOND_SONG = `${BASE_URL}music/one-direction-one-way-or-another-teenage-kicks-lyrics-128-ytshorts.savetube.me.mp3`; // Second song

interface ValidationRule {
  id: number;
  message: string;
  validator: (password: string) => boolean;
  unlocked: boolean;
  hint?: string;
  expected?: string;
}

function App() {
  const [password, setPassword] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const firstSongRef = useRef<HTMLAudioElement>(null);
  const secondSongRef = useRef<HTMLAudioElement>(null);
  const rulesContainerRef = useRef<HTMLDivElement>(null);
  const lastRuleRef = useRef<HTMLDivElement>(null);

  // Auto-play first song on mount
  useEffect(() => {
    const audioElement = firstSongRef.current;
    if (!audioElement) return;

    const playFirstSong = () => {
      // Make sure second song is stopped
      if (secondSongRef.current) {
        secondSongRef.current.pause();
        secondSongRef.current.currentTime = 0;
      }
      // Play first song
      audioElement.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    };

    // Try to play when audio can play
    if (audioElement.readyState >= 2) {
      // Audio is already loaded
      playFirstSong();
    } else {
      // Wait for audio to load
      audioElement.addEventListener("loadeddata", playFirstSong, {
        once: true,
      });
      audioElement.addEventListener("canplay", playFirstSong, { once: true });
    }

    // Cleanup
    return () => {
      audioElement.removeEventListener("loadeddata", playFirstSong);
      audioElement.removeEventListener("canplay", playFirstSong);
    };
  }, []);

  // Toggle between songs when button is clicked
  const handleButtonClick = () => {
    // Use functional update to get current state
    setButtonClicked((prevClicked) => {
      if (prevClicked) {
        // Currently playing second song, switch back to first song
        // Stop second song
        if (secondSongRef.current) {
          secondSongRef.current.pause();
          secondSongRef.current.currentTime = 0;
        }
        // Play first song after a small delay
        setTimeout(() => {
          if (firstSongRef.current) {
            firstSongRef.current.currentTime = 0;
            firstSongRef.current.play().catch((error) => {
              console.log("Error playing first song:", error);
            });
          }
        }, 50);
        return false; // Switch to first song
      } else {
        // Currently playing first song, switch to second song
        // Stop first song
        if (firstSongRef.current) {
          firstSongRef.current.pause();
          firstSongRef.current.currentTime = 0;
        }
        // Play second song after a small delay
        setTimeout(() => {
          if (secondSongRef.current) {
            secondSongRef.current.currentTime = 0;
            secondSongRef.current.play().catch((error) => {
              console.log("Error playing second song:", error);
            });
          }
        }, 50);
        return true; // Switch to second song
      }
    });
  };

  const [rules, setRules] = useState<ValidationRule[]>([
    {
      id: 1,
      message:
        "Twoje hasło musi zaczynać się od odpowiedzi na tę zagadkę (małe litery, bez spacji): 'Mówię bez ust i słyszę bez uszu. Nie mam ciała, ale ożywam z wiatrem.'",
      hint: "Powtarza twoje słowa z powrotem do ciebie.",
      validator: (pwd) => pwd.toLowerCase().startsWith("echo"),
      expected: "echo",
      unlocked: true,
    },
    {
      id: 2,
      message:
        "Po pierwszej odpowiedzi dodaj rok pierwszego lądowania na Księżycu.",
      hint: "Wydarzyło się to pod koniec lat 60.",
      validator: (pwd) => pwd.toLowerCase().startsWith("echo1969"),
      expected: "1969",
      unlocked: false,
    },
    {
      id: 3,
      message:
        "Twoje hasło musi zawierać co najmniej jedną wielką literę I jedną cyfrę.",
      hint: "Połącz litery i cyfry, np. 'A1'.",
      validator: (pwd) => {
        const hasUpper = /[A-Z]/.test(pwd);
        const hasDigit = /\d/.test(pwd);
        return hasUpper && hasDigit;
      },
      expected: "Przynajmniej 1 wielka litera i 1 cyfra w dowolnym miejscu",
      unlocked: false,
    },
    {
      id: 4,
      message: "Tuż po '1969' dodaj wynik tego działania: (7 * 8) - 10.",
      hint: "Najpierw pomnóż, potem odejmij.",
      validator: (pwd) => pwd.toLowerCase().startsWith("echo196946"),
      expected: "46",
      unlocked: false,
    },
    {
      id: 5,
      message: "Gdzieś w haśle musi być symbol chemiczny wody.",
      hint: "Dwie litery, jedna z nich powtórzona.",
      validator: (pwd) => /H2O/i.test(pwd),
      expected: "H2O",
      unlocked: false,
    },
    {
      id: 6,
      message:
        "Twoje hasło musi zawierać dzień tygodnia dokładnie po poniedziałku (małe litery).",
      hint: "Tylko angielska nazwa dnia.",
      validator: (pwd) => pwd.toLowerCase().includes("wtorek"),
      expected: "wtorek",
      unlocked: false,
    },
    {
      id: 7,
      message:
        "Na samym końcu hasła dodaj sumę WSZYSTKICH cyfr, które w nim występują.",
      hint: "Zsumuj każdą cyfrę: dla 'echo196946' to 1+9+6+9+4+6.",
      validator: (pwd) => {
        const digits = pwd.match(/\d/g);
        if (!digits || digits.length < 2) return false;
        const sum = digits.slice(0, -2).reduce((acc, d) => acc + Number(d), 0);
        const sumStr = String(sum);
        return pwd.endsWith(sumStr) || pwd.endsWith(sumStr + "ohce");
      },
      expected: "Ostatnie cyfry = suma wszystkich poprzednich cyfr w haśle",
      unlocked: false,
    },
    {
      id: 8,
      message:
        "haslo musi zawierac imiona (z malych liter) 3 siostrzeńców kaczora donalda",
      hint: "bez spacji i innych znaków specjalnych ",
      validator: (pwd) =>
        pwd.toLowerCase().includes("hyzio") &&
        pwd.toLowerCase().includes("dyzio") &&
        pwd.toLowerCase().includes("zyzio"),
      expected: "hyzio dyzio i zyzio",
      unlocked: false,
    },
    {
      id: 9,
      message:
        "Twoje hasło musi mieć co najmniej 45 znaków długości a maksymalnie 55",
      hint: "Możesz dodać znaki lub symbole na końcu.",
      validator: (pwd) => pwd.length >= 45 && pwd.length <= 55,
      expected: "długość >= 45 i <= 55",
      unlocked: false,
    },
    {
      id: 10,
      message:
        "Twoje hasło musi zawierać co najmniej jeden z tych symboli: !, ?, # lub @.",
      hint: "Dodaj jeden z nich w dowolnym miejscu.",
      validator: (pwd) => /[!?#@]/.test(pwd),
      expected: "Przynajmniej jeden z: ! ? # @",
      unlocked: false,
    },
    {
      id: 11,
      message:
        "Hasło musi zawierać inicjały miesięcy twoich urodzin w formacie: pierwsza litera miesiąca po polsku + numer dnia. Przykład: '3 sierpień = S3'.",
      hint: "Jeśli urodziny 3 lipca: 'J3'. Wstaw swoje dane.",
      validator: (pwd) => {
        // ZMIEŃ NA SWOJE DANE, np. urodzony 15 marca -> M15
        const pattern = "G6";
        return pwd.includes(pattern);
      },
      expected: "Wzór 'MDD' (pierwsza litera miesiąca + dzień)",
      unlocked: false,
    },
    {
      id: 12,
      message:
        "Hasło musi zawierać odpowiedź (małe litery, bez spacji): 'Jaka jest stolica Maroko?'",
      hint: "Użyj angielskiej nazwy.",
      validator: (pwd) => pwd.toLowerCase().includes("rabat"),
      expected: "rabat",
      unlocked: false,
    },
    {
      id: 13,
      message: "haslo musi zawierac rok chrztu polski",
      hint: "rok chrztu polski to 966",
      validator: (pwd) => {
        return pwd.toLowerCase().includes("966");
      },
      expected: "966",
      unlocked: false,
    },
    {
      id: 14,
      message:
        "Hasło musi kończyć się odwróconymi pierwszymi czterema literami.",
      hint: "Jeśli zaczyna się 'echo', musi kończyć 'ohce'.",
      validator: (pwd) => {
        if (pwd.length < 8) return false;
        const first4 = pwd.slice(0, 4);
        const reversed = first4.split("").reverse().join("").toLowerCase();
        return pwd.toLowerCase().endsWith(reversed);
      },
      expected: "Ostatnie 4 znaki = pierwsze 4 odwrócone",
      unlocked: false,
    },
  ]);

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    // Update rules: unlock only if ALL previous rules are passing
    // Lock rules if any previous rule fails
    const updatedRules = rules.map((rule, index) => {
      if (index === 0) {
        // First rule is always unlocked
        return rule;
      }

      // Check if ALL previous rules are currently passing
      const allPreviousRulesPassing = rules
        .slice(0, index)
        .every((prevRule) => prevRule.validator(value));

      // Unlock if all previous rules pass, lock if any fail
      return {
        ...rule,
        unlocked: allPreviousRulesPassing,
      };
    });

    setRules(updatedRules);
  };

  const getRuleStatus = (rule: ValidationRule) => {
    if (!rule.unlocked) {
      return "locked";
    }
    return rule.validator(password) ? "passed" : "failed";
  };

  // Only show rules that should be visible (unlocked rules)
  const visibleRules = rules.filter((rule) => rule.unlocked);

  // Auto-scroll to newly appeared password message
  useEffect(() => {
    if (lastRuleRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        lastRuleRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  }, [visibleRules.length]); // Trigger when number of visible rules changes

  return (
    <div className="min-h-screen bg-green-400 flex items-center justify-center p-4 relative">
      {/* Button in top right corner */}
      <button
        onClick={handleButtonClick}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all shadow-lg z-50"
      >
        {buttonClicked ? "jesteś pewna?" : "wyłącz last christmas"}
      </button>

      {/* Audio elements for the two songs */}
      <audio
        ref={firstSongRef}
        loop
        autoPlay
        preload="auto"
        onPlay={() => {
          // Ensure second song is stopped when first song plays
          if (secondSongRef.current && !secondSongRef.current.paused) {
            secondSongRef.current.pause();
            secondSongRef.current.currentTime = 0;
          }
        }}
      >
        <source src={FIRST_SONG} type="audio/mpeg" />
      </audio>
      <audio
        ref={secondSongRef}
        loop
        preload="auto"
        onPlay={() => {
          // Ensure first song is stopped when second song plays
          if (firstSongRef.current && !firstSongRef.current.paused) {
            firstSongRef.current.pause();
            firstSongRef.current.currentTime = 0;
          }
        }}
      >
        <source src={SECOND_SONG} type="audio/mpeg" />
      </audio>

      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        onClick={() => {
          // Start playing on first user interaction if not already playing
          if (
            firstSongRef.current &&
            !buttonClicked &&
            firstSongRef.current.paused
          ) {
            firstSongRef.current.play().catch(() => {});
          }
        }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Wpisz hasełko
        </h1>
        <p className="text-gray-600 text-center mb-6">
          To PROSTE! Po prostu podążaj za zasadami... jeśli umiesz! 😄
        </p>

        <div className="mb-6 mt-6">
          <input
            id="password"
            type="text"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
            placeholder="Enter your password..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>

        <div
          ref={rulesContainerRef}
          className="space-y-3 overflow-y-auto pr-2"
          style={{
            maxHeight: "300px", // Approximately 3 rules (each ~100px with spacing)
          }}
        >
          {visibleRules.map((rule, index) => {
            const status = getRuleStatus(rule);
            const isLastRule = index === visibleRules.length - 1;
            return (
              <div
                key={rule.id}
                ref={isLastRule ? lastRuleRef : null}
                className={`p-4 rounded-lg border-2 transition-all duration-500 ease-out ${
                  status === "passed"
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
                style={{
                  animation: "slideIn 0.5s ease-out",
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`text-2xl ${
                      status === "passed" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {status === "passed" ? "✅" : "❌"}
                  </span>
                  <p
                    className={`flex-1 ${
                      status === "passed" ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {rule.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {rules.every((rule) => rule.validator(password)) && (
          <div className="mt-6 space-y-4">
            <Link
              to="/congratulations"
              className="block p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white text-center font-bold text-lg animate-pulse hover:from-green-500 hover:to-blue-600 transition-all transform hover:scale-105 cursor-pointer"
            >
              🎉 ALOHOMORA! 🎉
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
