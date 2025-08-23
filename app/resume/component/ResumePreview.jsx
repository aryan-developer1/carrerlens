import { Mail, Phone, MapPin, Calendar, ExternalLink, Github, Linkedin, Twitter } from "lucide-react";

export const ResumePreview = ({ data = {} }) => {

   // Check if data object is empty or has no meaningful content
   const isEmpty = !data || Object.keys(data).length === 0 || 
     (!data.name && !data.email && !data.phone && !data.professionalSummary && !data.skills &&
      (!data.workExperience || data.workExperience.length === 0) &&
      (!data.education || data.education.length === 0) &&
      (!data.projects || data.projects.length === 0));

   if(isEmpty){
    return (
      <div className="max-w-4xl mx-auto text-center text-white p-8">
        <h1 className="text-4xl font-bold mb-2">
          No Data Found !
        </h1>
        <p className="text-white">Please add some data and then click on save button</p>
      </div>
    )
   }

  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 shadow-lg">
      {/* Header Section */}
      <div className="border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {data.name || "Your Name"}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.address}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          {data.linkedinProfile && (
            <a href={data.linkedinProfile} className="flex items-center gap-1 text-blue-600 hover:underline">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {data.githubProfile && (
            <a href={data.githubProfile} className="flex items-center gap-1 text-gray-700 hover:underline">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {data.twitterProfile && (
            <a href={data.twitterProfile} className="flex items-center gap-1 text-blue-400 hover:underline">
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </a>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.professionalSummary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.professionalSummary}
          </p>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            SKILLS
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.skills}
          </p>
        </div>
      )}

      {/* Work Experience */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
          WORK EXPERIENCE
        </h2>
        {data.workExperience?.length ? (
          <div className="space-y-4">
            {data.workExperience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                </div>
                <p className="text-md font-medium text-gray-700 mb-2">
                  {exp.company}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No work experience added</p>
        )}
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
          EDUCATION
        </h2>
        {data.education?.length ? (
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree} in {edu.fieldOfStudy}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-md font-medium text-gray-700">
                    {edu.collegeName}
                  </p>
                  <div className="text-sm text-gray-600">
                    <span>{edu.session}</span>
                    {edu.cgpa && <span className="ml-2">CGPA: {edu.cgpa}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No education added</p>
        )}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
          PROJECTS
        </h2>
        {data.projects?.length ? (
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  <span className="font-semibold">Technologies:</span> {project.technologies}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No projects added</p>
        )}
      </div>
    </div>
  );
};
