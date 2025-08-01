import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import Image from 'next/image';
import type { AboutPage } from 'shared';

export const metadata: Metadata = {
  title: 'About Me - Full-Stack Developer & Technical Writer',
  description: 'Learn more about my journey as a software engineer, my development philosophy, and what drives my passion for technology and innovation.',
  keywords: ['about', 'software engineer', 'full-stack developer', 'technical writer', 'developer story', 'professional profile'],
  openGraph: {
    title: 'About Me - Full-Stack Developer & Technical Writer | BlogClaude',
    description: 'Learn more about my journey as a software engineer, my development philosophy, and what drives my passion for technology and innovation.',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Me - Full-Stack Developer & Technical Writer | BlogClaude',
    description: 'Learn more about my journey as a software engineer, my development philosophy, and what drives my passion for technology and innovation.',
  }
};

async function getAboutData(): Promise<AboutPage> {
  try {
    const filePath = path.join(process.cwd(), '..', '..', 'content', 'about', 'about-data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(fileContents) as AboutPage;
    
    // Basic validation of required fields
    if (!parsedData.bio || !parsedData.tagline || !parsedData.photoUrl) {
      throw new Error('Invalid about data: missing required fields');
    }
    
    return parsedData;
  } catch (error) {
    console.error('Error loading about data:', error);
    // Return fallback data to prevent page crash
    return {
      bio: "Content temporarily unavailable. Please check back later.",
      photoUrl: "/images/placeholder.jpg",
      tagline: "Full-Stack Developer",
      lastUpdated: new Date().toISOString()
    };
  }
}

export default async function AboutPage() {
  const aboutData = await getAboutData();
  const { bio, photoUrl, tagline, additionalSections } = aboutData;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-12 text-white">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={photoUrl}
                    alt="Professional photo"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">About Me</h1>
              <p className="text-xl text-blue-100">{tagline}</p>
            </div>
          </div>

          <div className="px-6 py-8 space-y-8">
            {/* Bio Section */}
            <section aria-labelledby="bio-heading">
              <h2 id="bio-heading" className="text-2xl font-bold text-gray-900 mb-6">My Story</h2>
              <div className="prose prose-lg max-w-none">
                {bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Additional Sections */}
            {additionalSections && additionalSections.length > 0 && (
              <>
                {additionalSections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <section key={section.id} aria-labelledby={`section-${section.id}`}>
                      <h2 id={`section-${section.id}`} className="text-2xl font-bold text-gray-900 mb-6">
                        {section.title}
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </section>
                  ))}
              </>
            )}

            {/* Call to Action Section */}
            <section className="bg-gray-50 rounded-lg p-6" aria-labelledby="cta-heading">
              <div className="text-center">
                <h2 id="cta-heading" className="text-2xl font-semibold text-gray-900 mb-4">
                  Let&apos;s Connect
                </h2>
                <p className="text-gray-600 mb-6">
                  I&apos;m always excited to connect with fellow developers, discuss new ideas, 
                  or collaborate on interesting projects.
                </p>
                <nav aria-label="Related pages" className="flex flex-wrap justify-center gap-4">
                  <a
                    href="/resume"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    aria-describedby="resume-desc"
                  >
                    View My Resume
                  </a>
                  <span id="resume-desc" className="sr-only">Navigate to resume page to see professional experience and skills</span>
                  <a
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    aria-describedby="blog-desc"
                  >
                    Read My Blog
                  </a>
                  <span id="blog-desc" className="sr-only">Navigate to blog page to read technical articles and insights</span>
                </nav>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}