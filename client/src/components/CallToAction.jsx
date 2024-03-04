import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more?</h2>
        <p className="text-gray-500 my-2">Chack out resoure for the NextJS</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://www.mridul.tech/blogs/next-js-project-ideas-to-boost-your-portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lean More
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://wp.mridul.tech/wp-content/uploads/2023/05/Next-JS-Project-Ideas.webp" />
      </div>
    </div>
  );
}
