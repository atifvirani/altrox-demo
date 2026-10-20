import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Globe, User, BookOpen, Play } from 'lucide-react';
import { SEED_COURSES } from '@/data/seed';

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEED_COURSES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = SEED_COURSES.find(c => c.slug === slug);
  if (!course) return { title: 'Course Not Found | ALTROX' };

  return {
    title: `${course.title} | ALTROX Academy`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = SEED_COURSES.find(c => c.slug === slug);
  if (!course) notFound();

  return (
    <div className="bg-[#080A09] text-[#F5F7F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back Link */}
      <Link
        href="/learning"
        className="inline-flex items-center space-x-2 text-xs font-mono text-[#A2AAA4] hover:text-[#39FF78] mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO ALL MASTERCLASSES</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Course Overview & Syllabus */}
        <div className="lg:col-span-8 space-y-12">
          <div className="border-b border-[#1A221C] pb-8">
            <div className="flex items-center space-x-3 text-xs font-mono text-[#39FF78] uppercase mb-3">
              <span>{course.level}</span>
              <span>·</span>
              <span>Instructor: {course.instructor_character}</span>
              <span>·</span>
              <span>{course.duration_hours} Total Hours</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-editorial tracking-tight text-[#F5F7F5]">
              {course.title}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#A2AAA4] leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Curriculum Modules */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-editorial text-[#F5F7F5]">
              Course Syllabus & Modules
            </h2>

            {course.lessons && course.lessons.length > 0 ? (
              <div className="space-y-4">
                {course.lessons.map((lesson, idx) => (
                  <div
                    key={lesson.id}
                    className="p-5 bg-[#0E1310] border border-[#1A221C] rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded bg-[#162118] border border-[#213224] flex items-center justify-center font-mono text-xs text-[#39FF78] font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#F5F7F5]">{lesson.title}</div>
                        <div className="text-[11px] font-mono text-[#A2AAA4] mt-0.5">{lesson.summary}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 font-mono text-xs text-[#A2AAA4]">
                      <span>{lesson.duration_minutes} min</span>
                      {lesson.is_free_preview && (
                        <span className="px-2 py-0.5 bg-[#39FF78]/10 text-[#39FF78] border border-[#39FF78]/40 rounded text-[10px]">
                          FREE PREVIEW
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-[#0E1310] border border-[#1A221C] rounded text-xs font-mono text-[#A2AAA4]">
                14 comprehensive video lessons, project exercise files, and exclusive Discord community access.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Enrollment Card */}
        <div className="lg:col-span-4">
          <div className="bg-[#0E1410] border border-[#1A221C] rounded-lg p-6 sm:p-8 space-y-6 sticky top-28 shadow-2xl">
            <div className="relative aspect-video rounded overflow-hidden bg-black border border-[#1A221C]">
              <img src={course.cover_image} alt={course.title} className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="flex items-baseline space-x-3 font-mono">
                <span className="text-4xl font-black text-[#39FF78]">${course.price}</span>
                <span className="text-base text-[#A2AAA4] line-through">${course.original_price}</span>
              </div>
              <div className="text-[11px] font-mono text-[#39FF78] mt-1">
                Lifetime Access · Instant Enrollment
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#1A221C] text-xs font-mono text-[#F5F7F5]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#39FF78]" />
                <span>{course.duration_hours} hours on-demand video</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#39FF78]" />
                <span>Language: {course.language}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#39FF78]" />
                <span>All project assets & preset files</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#39FF78]" />
                <span>Certificate of Completion</span>
              </div>
            </div>

            <Link
              href={`/contact?service=course-enrollment&course=${course.slug}`}
              className="w-full py-4 bg-[#39FF78] hover:bg-[#20A04B] text-[#080A09] font-mono font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(57,255,120,0.3)]"
            >
              <span>ENROLL NOW IN MASTERCLASS</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
