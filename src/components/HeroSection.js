import { Space_Grotesk } from 'next/font/google'
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // specify the weights you need
  variable: '--font-space-grotesk', // optional: for CSS variable usage
  display: 'swap', // optional
});

const HeroSection = () => {
    return (
        <section className="bg-gray-100 h-[100vh] overlay-cover py-20">
        
        <div className='max-w-7xl flex items-center justify-center'>
        <div className=''>
        
        <p className="uppercase tracking-widest text-gray-500 mb-3">Services</p>
        <h1 className={`${spaceGrotesk.className} text-5xl font-extrabold mb-4 leading-tight max-w-4xl mx-auto`}>
          Better design for your digital products.
        </h1>
        <p className="text-lg text-gray-600 mb-6  mx-auto">
          We are a creative studio specializing in UI/UX design, development and strategy.
        </p>
        <button className="bg-black text-white px-8 py-3 rounded-full font-semibold text-sm">
          Get Start
        </button>
        </div>
        </div>
        <img className='absolute top-0 right-0 -z-2' src='/images/hero.png'/>
      </section>
    );
  };
  
  export default HeroSection;
  