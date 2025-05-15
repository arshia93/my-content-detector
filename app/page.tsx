import { CheckIcon, CloudLightningIcon as LightningBoltIcon, UploadIcon, ArrowRightIcon } from "lucide-react"
import { Nav } from "@/components/Nav"
import { MediaLogos } from "@/components/MediaLogos"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* Main Content */}
      <main className="container px-4 py-12 mx-auto md:py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Column - Hero Content */}
          <div className="flex flex-col justify-center">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold text-gray-700 md:text-5xl">
                Navigate AI use
                <div className="mt-2">
                  & <span className="text-green-600">remain human.</span>
                </div>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
              A clear score shows how much of your work appears to be written with AI so you can submit it with peace of mind.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 bg-purple-50 bg-opacity-50 rounded-xl p-6">
                <div>
                  <div className="text-3xl font-bold text-green-600">99%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-700">3M</div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-700">5500</div>
                  <div className="text-sm text-gray-600">Universities & Schools</div>
                </div>
              </div>


              {/* Feature List */}
              <div className="mt-10 space-y-3">
                <div className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 mt-0.5 text-green-600" />
                  <span className="text-gray-700">The world&apos;s most accurate AI checker</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 mt-0.5 text-green-600" />
                  <span className="text-gray-700">Smart bibliography and source check</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 mt-0.5 text-green-600" />
                  <span className="text-gray-700">Replay writing in Google Docs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 mt-0.5 text-green-600" />
                  <span className="text-gray-700">Customize an educator-in-the-loop AI grader</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - AI Detector Card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800">Was this text written by AI or a Human?</h2>

              <div className="mt-8">
                <textarea
                  className="w-full h-48 p-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Paste your text"
                ></textarea>
                <div className="mt-3 text-sm text-gray-500">0/5,000 characters</div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <button className="flex items-center justify-center w-full gap-2 px-6 py-3 text-base text-white bg-green-600 rounded-md hover:bg-green-800">
                  Check text
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Media Logos */}
        <MediaLogos />
      </main>
    </div>
  )
}
