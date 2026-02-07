
import { CommitsGrid } from "./ui/commits-grid"
import OrbitingSkills from "./ui/orbiting-skills"


import { AppleStyleDock } from "./AppleStyleDock"

const CommitsGridDemo = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-8">
            <OrbitingSkills />
            <CommitsGrid text="the end" className="max-w-4xl" />
            <AppleStyleDock />
        </div>
    )
}

export { CommitsGridDemo }
