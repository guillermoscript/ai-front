
export default function Schedule() {
	return (
		<section className="antialiased">
			<div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-4xl font-extrabold leading-tight tracking-tight text-secondary">
						Try it right now!
					</h2>

					<h4 className="mt-3 text-xl font-light text-gray-500">
						Upload your audio file and get the transcription in seconds.
					</h4>

					<div className="mt-6">
						
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
					</div>
				</div>

				<div className="flow-root max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16">
					<div className="-my-4 divide-y">
						<div className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
							<p className="w-32 text-lg font-normal  sm:text-right shrink-0">
								08:00 - 09:00
							</p>
							<h3 className="text-lg font-semibold ">
								<a href="#" className="hover:underline">
									Opening remarks
								</a>
							</h3>
						</div>

                        <TextTimeLine
                            time="09:00 - 10:00"
                            text="Keynote"
                        />
                        <TextTimeLine
                            time="10:00 - 11:00"
                            text="Keynote"
                        />
					</div>
				</div>
			</div>
		</section>
	);
}

type TextTimeLineProps = {
    time: string;
    text: string;
}

function TextTimeLine({ time, text }: TextTimeLineProps) {
    return (
        <div className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
            <p className="w-32 text-lg font-normal  sm:text-right shrink-0">
                {time}
            </p>
            <h3 className="text-lg font-semibold ">
                <a href="#" className="hover:underline">
                    {text}
                </a>
            </h3>
        </div>
    )
}