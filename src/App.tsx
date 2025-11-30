import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

// MP3 file paths in public/music folder
const FIRST_SONG =
  "/music/wham-last-christmas-official-video-128-ytshorts.savetube.me.mp3"; // First song (Last Christmas)
const SECOND_SONG =
  "/music/one-direction-one-way-or-another-teenage-kicks-lyrics-128-ytshorts.savetube.me.mp3"; // Second song

interface ValidationRule {
  id: number;
  message: string;
  validator: (password: string) => boolean;
  unlocked: boolean;
}

function App() {
  const [password, setPassword] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const firstSongRef = useRef<HTMLAudioElement>(null);
  const secondSongRef = useRef<HTMLAudioElement>(null);

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
      message: "Your password must have at least 5 letters",
      validator: (pwd) => {
        const letters = pwd.match(/[a-zA-Z]/g);
        return letters ? letters.length >= 5 : false;
      },
      unlocked: true,
    },
    {
      id: 2,
      message: "Your password must start with the name of your dog (sparky)",
      validator: (pwd) => pwd.toLowerCase().startsWith("sparky"),
      unlocked: false,
    },
    {
      id: 3,
      message:
        "Your password must end with the sum of these two numbers: 14 + 14",
      validator: (pwd) => pwd.endsWith("28"),
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
          Password Requirements
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Follow the rules... if you can! 😄
        </p>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
            placeholder="Enter your password..."
          />
        </div>

        <div
          className="space-y-3 overflow-y-auto pr-2"
          style={{
            maxHeight: "300px", // Approximately 3 rules (each ~100px with spacing)
          }}
        >
          {visibleRules.map((rule) => {
            const status = getRuleStatus(rule);
            return (
              <div
                key={rule.id}
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
              🎉 Congratulations! Your password is... acceptable? 🎉
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
