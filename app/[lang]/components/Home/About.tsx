'use client'
import { useScrollProgress } from '@/hooks/useScrollProgress';
import AutoCarouselBelt from './components/AutoCarouselBelt';
import { useSettingsStore } from '@/stores/settingsStore';

const About = () => {
    const {dict} = useSettingsStore()
    const { scale: mainScale } = useScrollProgress({
        container: "window",
        minScale: 0 ,
        maxScale: 6,
    });

  return (
    <div className="relative min-h-[200vh]">
        <div className="sticky top-0 w-full">
            <div className="sticky top-0 w-full max-h-screen flex flex-col items-center justify-center overflow-hidden">
                <div
                className={`absolute inset-0 w-full h-screen object-center bg-cyan-950`}
                style={{scale: 1 + mainScale * 0.05}}
                >
                    <div className="bg-white/0 w-full min-h-full absolute inset-0"></div>
                    <style jsx>{`
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes floatRandom {
            0% {
                transform: translate(-50%, -50%) translate(0px, 0px);
            }
            20% {
                transform: translate(-50%, -50%) translate(6px, -4px);
            }
            40% {
                transform: translate(-50%, -50%) translate(-8px, 3px);
            }
            60% {
                transform: translate(-50%, -50%) translate(4px, 8px);
            }
            80% {
                transform: translate(-50%, -50%) translate(-5px, -7px);
            }
            100% {
                transform: translate(-50%, -50%) translate(0px, 0px);
            }
        }

        .animate-float-random {
            animation: floatRandom 25s ease-in-out infinite alternate;
        }
    `}</style>

    <div className="text-center mb-16 absolute top-1/2 left-1/2 flex flex-col gap-5 animate-float-random">
        <h1
            className="text-3xl md:text-5xl font-bold mb-4 text-transparent"
            style={{
                background: 'linear-gradient(-45deg, #fff, #fff, #fff, #fff, #fff)',
                backgroundSize: '300% 300%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                animation: 'gradientShift 6s ease infinite',
            }}
        >
            {dict.withMoreThanTenValidTechnicalCertificates}
        </h1>

        <p
            className="text-[1rem] text-transparent"
            style={{
                background: 'linear-gradient(-45deg, #fff, #fff, #fff, #fff, #fff)',
                backgroundSize: '300% 300%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                animation: 'gradientShift 6s ease infinite',
            }}
        >
            {dict.andYearsOfExperienceAtYourService}
        </p>
    </div>
                </div>
                <div
                    className={`relative w-screen h-screen backdrop-blur-2xl bg-radial bg-white`}
                    style={{
                        WebkitMaskImage: `radial-gradient(circle at center, transparent ${570*mainScale - 1100}px, black ${570*mainScale - 1100}px)`,
                        maskImage: `radial-gradient(circle at center, transparent ${570*mainScale - 1100}px, black ${570*mainScale - 1100}px)`,
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                    }}
                >
                    <h2 className="text-9xl max-md:text-7xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-white">خدمات</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
