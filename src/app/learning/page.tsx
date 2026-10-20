import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Globe, User, BookOpen } from 'lucide-react';
import { SEED_COURSES } from '@/data/seed';

export const metadata = {
  title: 'Learning & Masterclasses | ALTROX Studio',
  description: 'Master viral short-form video editing, cinematic 3D VFX, and full-stack creative web engineering directly from the ALTROX creators.',
};

export default function LearningPage() {
  return (
    <div className="bg-[#080A09] text-[#F5F7F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1A221C] pb-12 mb-16">
        <span className="font-mono text-xs text-[#39FF78] uppercase tracking-widest font-semibold">
          / ALTROX Academy
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-editorial tracking-tight text-[#F5F7F5] mt-3">
          MASTERCLASSES DIRECT <br />
          <span className="text-[#39FF78]">FROM THE CREATORS.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-[#A2AAA4] max-w-2xl font-normal leading-relaxed">
          No generic theory. Learn the exact production pipelines, Premiere Pro frameworks, Blender lighting setups, and WebGL code that generate millions of views and thousands of dollars in commercial contracts.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SEED_COURSES.map((course) => (
          <div
            key={course.id}
            className="group bg-[#0E1310] border border-[#1A221C] hover:border-[#39FF78]/40 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-[#070908]">
                <img
                  src={course.cover_image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#080A09]/80 backdrop-blur border border-[#1A221C] rounded font-mono text-[10px] text-[#39FF78]">
                  {course.level}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3 text-[11px] font-mono text-[#A2AAA4]">
                  <span className="flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-[#39FF78]" />
                    <span>{course.instructor_character}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#39FF78]" />
                    <span>{course.duration_hours}h</span>
                  </span>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-[#F5F7F5] group-hover:text-[#39FF78] transition-colors">
                  {course.title}
                </h2>
                <p className="text-xs text-[#A2AAA4] leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                <div className="pt-2 font-mono text-xs text-[#A2AAA4]">
                  <Globe className="w-3.5 h-3.5 inline mr-1 text-[#39FF78]" />
                  <span>{course.language}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-[#1A221C] flex items-center justify-between font-mono">
                <div>
                  <span className="text-2xl font-black text-[#39FF78]">${course.price}</span>
                  <span className="text-xs text-[#A2AAA4] line-through ml-2">${course.original_price}</span>
                </div>
                <Link
                  href={`/learning/${course.slug}`}
                  className="inline-flex items-center space-x-1 px-4 py-2 bg-[#17221A] hover:bg-[#39FF78] text-[#39FF78] hover:text-[#080A09] text-xs font-bold rounded transition-colors"
                >
                  <span>SYLLABUS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
