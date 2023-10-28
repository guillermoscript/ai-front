import Image from 'next/image';
import aiImage from '@/public/img/aiImage.png';

export default function Hero() {
	return (
		<section className="pt-6 lg:pt-12">
			<div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-2 lg:py-16 lg:grid-cols-12">
				<div className="mr-auto place-self-center lg:col-span-5">
					<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
						AI Audio Transcription
					</h1>
					<p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl">
						AI Transcription Software: Transcribe Audio to Text in Seconds, Regardless of the Language
					</p>
					<a
						href="#"
						className="btn btn-primary mr-5 mb-3"
					>
						Get started
						<svg
							className="w-5 h-5 ml-2 -mr-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</a>
					<a
						href="#"
						className="btn btn-outline btn-secondary "
					>
						Speak to Sales
					</a>
				</div>
				<div className="hidden lg:mt-0 lg:col-span-7 lg:flex ">
					<Image
						src={aiImage}
						alt="mockup"
					/>
				</div>
			</div>
		</section>
	);
}
