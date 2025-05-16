import { CheckIcon, CloudLightningIcon as LightningBoltIcon, UploadIcon, ArrowRightIcon } from "lucide-react"
import { Nav } from "@/components/Nav"
import { MediaLogos } from "@/components/MediaLogos"
import { ContentDetectorForm } from '@/components/content-detector-form'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* Main Content */}
      <main className="container px-4 py-12 mx-auto md:py-16">
        <div className="flex flex-col gap-12">
          {/* Hero Content */}
          <div className="flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-gray-700 md:text-5xl">Navigate AI use & <span className="text-green-600">remain human.</span></h1>
              <p className="mt-6 text-lg text-gray-600">
              A clear score shows how much of your work appears to be written with AI so you can submit it with peace of mind.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-1 mt-10 mb-10 bg-purple-50 bg-opacity-50 rounded-xl p-6">
                <div>
                  <div className="text-3xl font-bold text-green-600">99%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-700">3,000,000+</div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-700">5500</div>
                  <div className="text-sm text-gray-600">Universities & Schools</div>
                </div>
              </div>


              

          {/* Right Column - AI Detector Card */}
          <ContentDetectorForm />
        </div>
        {/* Media Logos */}
        <MediaLogos />
        {/* Feature List */}
        <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 mt-0.5 text-green-600" />
                  <span className="text-gray-700">The world&apos;s most accurate AI checker</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 mt-0.5 text-green-600" />
                  <span className="text-gray-700">Smart bibliography and source check</span>
                </div>
                {/* <div className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 mt-0.5 text-green-600" />
                  <span className="text-gray-700">Replay writing in Google Docs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 mt-0.5 text-green-600" />
                  <span className="text-gray-700">Customize an educator-in-the-loop AI grader</span>
                </div> */}
              </div>
            </div>
          </div>
      </main>
    </div>
  )
}
