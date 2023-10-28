export default function Contact() {
	return (
		<section className="w-full max-w-screen-lg mx-auto">
			<div className="py-8 lg:py-16 px-4 mx-auto">
				<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-primary">
					Contact Us
				</h2>
				<p className="mb-8 lg:mb-16 font-light text-center sm:text-xl">
					Got a technical issue? Want to send feedback about a beta
					feature? Need details about our Business plan? Let us know.
				</p>
				<form action="#" className="space-y-8">
					<div>
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium"
						>
							Your email
						</label>
						<input
							placeholder="name@flowbite.com"
							type="email"
							id="email"
							className="input input-bordered w-full"
						/>
					</div>
					<div>
						<label
							htmlFor="subject"
							className="block mb-2 text-sm font-medium"
						>
							Subject
						</label>
						<input
							id="subject"
							placeholder="Let us know how we can help you"
							type="text"
							className="input input-bordered w-full"
						/>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="message"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
						>
							Your message
						</label>
						<textarea
							rows={6}
							className="textarea textarea-bordered w-full"
							placeholder="Bio"
						></textarea>
					</div>
					<button type="submit" className="btn btn-accent">
						Send message
					</button>
				</form>
			</div>
		</section>
	);
}
