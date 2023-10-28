import Image from "next/image";
import heroTalk from "@/public/img/heroTalk.png";
import talk from "@/public/img/talk.png";

export default function Text() {
	return (
		<section className="p-4">
			<div className="gap-16 items-center pb-8 px-4 mx-auto max-w-screen-2xl lg:grid lg:grid-cols-2 lg:pb-16 lg:px-6">
				<div className="font-light sm:text-lg ">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-secondary">
						We didn`&apos;`t reinvent the wheel
					</h2>
					<p className="mb-4">
						We are strategists, designers and developers. Innovators
						and problem solvers. Small enough to be simple and
						quick, but big enough to deliver the scope you want at
						the pace you need. Small enough to be simple and quick,
						but big enough to deliver the scope you want at the pace
						you need.
					</p>
					<p>
						We are strategists, designers and developers. Innovators
						and problem solvers. Small enough to be simple and
						quick.
					</p>
				</div>
				<div className="flex mt-8">
					<Image src={heroTalk} alt="mockup" />
				</div>
				<div className="flex mt-8">
					<Image src={talk} alt="mockup" />
				</div>
				<div className="font-light sm:text-lg ">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-secondary">
						We didn&apos;t reinvent the wheel
					</h2>
					<p className="mb-4">
						We are strategists, designers and developers. Innovators
						and problem solvers. Small enough to be simple and
						quick, but big enough to deliver the scope you want at
						the pace you need. Small enough to be simple and quick,
						but big enough to deliver the scope you want at the pace
						you need.
					</p>
					<p>
						We are strategists, designers and developers. Innovators
						and problem solvers. Small enough to be simple and
						quick.
					</p>
				</div>
			</div>
		</section>
	);
}
