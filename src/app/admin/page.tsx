'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Video,
  Clapperboard,
  Mail,
  Image,
  Settings,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Archive,
  Eye,
  ShieldCheck,
  RefreshCw,
  Search,
  Lock,
  Unlock,
} from 'lucide-react';
import { db } from '@/lib/supabase';
import {
  ContentItem,
  VideoScript,
  ContactInquiry,
  MediaAsset,
  SiteSettings,
  PublishingStatus,
  CharacterId,
} from '@/lib/types';

export default function AdminControlRoomPage() {
  // Authorization Gate (Default passkey for Control Room is 'altrox2026')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'content' | 'scripts' | 'inquiries' | 'media' | 'settings'
  >('overview');

  // Live Data State
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [scriptsList, setScriptsList] = useState<VideoScript[]>([]);
  const [inquiriesList, setInquiriesList] = useState<ContactInquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(db.getSettings());
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>('');

  // Editing Forms State
  const [editingContent, setEditingContent] = useState<Partial<ContentItem> | null>(null);
  const [editingScript, setEditingScript] = useState<Partial<VideoScript> | null>(null);
  const [filterQuery, setFilterQuery] = useState<string>('');

  // Load Initial Data
  const refreshData = () => {
    setContentList(db.getAllContent());
    setScriptsList(db.getScripts());
    setInquiriesList(db.getInquiries());
    setSettings(db.getSettings());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Content Actions
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContent?.title || !editingContent?.body) return;

    const saved = db.saveContent(editingContent as any);
    refreshData();
    setEditingContent(null);
    notify(`Content "${saved.title}" saved successfully [Status: ${saved.status}]`);
  };

  const handleDeleteContent = (id: string) => {
    if (confirm('Are you sure you want to delete this content item?')) {
      db.deleteContent(id);
      refreshData();
      notify('Content item deleted.');
    }
  };

  // Script Actions (Script Studio)
  const handleSaveScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScript?.title) return;

    const saved = db.saveScript(editingScript as any);
    refreshData();
    setEditingScript(null);
    notify(`Script "${saved.title}" saved in Script Studio.`);
  };

  const handleDeleteScript = (id: string) => {
    if (confirm('Delete this production script?')) {
      db.deleteScript(id);
      refreshData();
      notify('Production script removed.');
    }
  };

  // Inquiry Status
  const handleUpdateInquiry = (id: string, status: ContactInquiry['status']) => {
    db.updateInquiryStatus(id, status);
    refreshData();
    notify(`Inquiry updated to "${status}".`);
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateSettings(settings);
    refreshData();
    notify('Global site settings updated.');
  };

  // Computed Overview Metrics
  const publishedCount = contentList.filter((c) => c.status === 'published').length;
  const draftCount = contentList.filter((c) => c.status === 'draft').length;
  const scheduledCount = contentList.filter((c) => c.status === 'scheduled').length;
  const newInquiriesCount = inquiriesList.filter((i) => i.status === 'new').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#080A09]">
        <div className="w-full max-w-md p-8 bg-[#0E1410] border border-[#1A221C] rounded-lg shadow-2xl space-y-6 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#16221A] border border-[#39FF78]/40 flex items-center justify-center text-[#39FF78]">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#F5F7F5] font-editorial">
              ALTROX CONTROL ROOM
            </h2>
            <p className="text-xs text-[#A2AAA4] font-mono mt-1">
              Restricted access. Authorized directors only.
            </p>
          </div>
          {authError && (
            <div className="text-xs text-red-400 font-mono bg-red-950/40 border border-red-500/30 p-2 rounded">
              {authError}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (passkeyInput === 'altrox2026' || passkeyInput === 'admin') {
                setIsAuthenticated(true);
              } else {
                setAuthError('Invalid director passkey.');
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={passkeyInput}
              onChange={(e) => setPasskeyInput(e.target.value)}
              placeholder="Enter director passkey..."
              className="w-full px-4 py-3 bg-[#080B09] border border-[#1C251E] focus:border-[#39FF78] rounded text-xs text-[#F5F7F5] font-mono text-center focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#39FF78] hover:bg-[#20A04B] text-[#080A09] font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              AUTHENTICATE & ENTER
            </button>
            <div className="text-[10px] font-mono text-[#A2AAA4]/70">
              Demo Access Passkey: <code className="text-[#39FF78]">altrox2026</code>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#080A09] text-[#F5F7F5] min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner & Notification Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-[#1A221C] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#39FF78]">
            <ShieldCheck className="w-4 h-4" />
            <span>ALTROX CONTROL ROOM CMS // v2.4</span>
          </div>
          <h1 className="text-3xl font-black font-editorial tracking-tight text-[#F5F7F5] mt-1">
            Studio Management Console
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {notification && (
            <div className="px-3 py-1.5 bg-[#122116] border border-[#39FF78]/40 rounded text-xs font-mono text-[#39FF78] flex items-center space-x-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{notification}</span>
            </div>
          )}
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-1.5 bg-[#111512] hover:bg-[#182119] border border-[#1A221C] rounded text-xs font-mono text-[#A2AAA4] hover:text-[#F5F7F5] flex items-center space-x-1"
          >
            <Eye className="w-3.5 h-3.5 text-[#39FF78]" />
            <span>View Live Site</span>
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 bg-[#1A1212] hover:bg-[#281515] border border-red-900/40 rounded text-xs font-mono text-red-300"
          >
            Lock Console
          </button>
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="flex overflow-x-auto pb-2 border-b border-[#1A221C] gap-2 mb-8 font-mono text-xs">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'content', label: `Content Hub (${contentList.length})`, icon: FileText },
          { id: 'scripts', label: `Script Studio (${scriptsList.length})`, icon: Clapperboard },
          { id: 'inquiries', label: `Inquiries (${newInquiriesCount} new)`, icon: Mail },
          { id: 'media', label: 'Media Library', icon: Image },
          { id: 'settings', label: 'Site Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setEditingContent(null);
                setEditingScript(null);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded transition-all shrink-0 border ${
                isActive
                  ? 'bg-[#39FF78] text-[#080A09] border-[#39FF78] font-bold shadow-[0_0_15px_rgba(57,255,120,0.25)]'
                  : 'bg-[#0E1310] text-[#A2AAA4] border-[#1A221C] hover:text-[#F5F7F5] hover:border-[#2C3A30]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==============================================================================
          TAB 1: OVERVIEW METRICS & RECENT ACTIVITY
          ============================================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 bg-[#0E1310] border border-[#1A221C] rounded-lg">
              <div className="text-xs font-mono text-[#A2AAA4] uppercase">Live Published</div>
              <div className="text-3xl sm:text-4xl font-black text-[#39FF78] mt-2">{publishedCount}</div>
              <div className="text-[11px] font-mono text-[#A2AAA4]/70 mt-1">Visible on public sitemap</div>
            </div>
            <div className="p-6 bg-[#0E1310] border border-[#1A221C] rounded-lg">
              <div className="text-xs font-mono text-[#A2AAA4] uppercase">Drafts in Progress</div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-2">{draftCount}</div>
              <div className="text-[11px] font-mono text-[#A2AAA4]/70 mt-1">Unpublished internal articles</div>
            </div>
            <div className="p-6 bg-[#0E1310] border border-[#1A221C] rounded-lg">
              <div className="text-xs font-mono text-[#A2AAA4] uppercase">Scheduled Releases</div>
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 mt-2">{scheduledCount}</div>
              <div className="text-[11px] font-mono text-[#A2AAA4]/70 mt-1">Pending publication cron</div>
            </div>
            <div className="p-6 bg-[#0E1310] border border-[#1A221C] rounded-lg">
              <div className="text-xs font-mono text-[#A2AAA4] uppercase">Pending Inquiries</div>
              <div className="text-3xl sm:text-4xl font-black text-[#39FF78] mt-2">{newInquiriesCount}</div>
              <div className="text-[11px] font-mono text-[#A2AAA4]/70 mt-1">Awaiting director response</div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-[#0E1310] border border-[#1A221C] rounded-lg space-y-4">
              <h3 className="font-bold text-base text-[#F5F7F5] font-mono uppercase tracking-wider text-[#39FF78]">
                Quick Create Actions
              </h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <button
                  onClick={() => {
                    setEditingContent({
                      title: '',
                      type: 'blog',
                      status: 'published',
                      body: '',
                      excerpt: '',
                      reading_time: '4 min read',
                      character_featured: 'altrox',
                    });
                    setActiveTab('content');
                  }}
                  className="p-4 bg-[#080B09] hover:bg-[#152018] border border-[#1A221C] hover:border-[#39FF78]/40 rounded text-left transition-all"
                >
                  <Plus className="w-4 h-4 text-[#39FF78] mb-2" />
                  <div className="font-bold text-[#F5F7F5]">New Blog Article</div>
                  <div className="text-[10px] text-[#A2AAA4]">Technical dispatch or guide</div>
                </button>

                <button
                  onClick={() => {
                    setEditingContent({
                      title: '',
                      type: 'reel',
                      status: 'published',
                      body: 'Short form viral reel framework.',
                      aspect_ratio: '9:16',
                      character_featured: 'chutki',
                    });
                    setActiveTab('content');
                  }}
                  className="p-4 bg-[#080B09] hover:bg-[#152018] border border-[#1A221C] hover:border-[#39FF78]/40 rounded text-left transition-all"
                >
                  <Plus className="w-4 h-4 text-[#39FF78] mb-2" />
                  <div className="font-bold text-[#F5F7F5]">New Reel / Short</div>
                  <div className="text-[10px] text-[#A2AAA4]">60s high-retention video</div>
                </button>

                <button
                  onClick={() => {
                    setEditingScript({
                      title: '',
                      duration: '1m',
                      aspect_ratio: '9:16',
                      character: 'Chutki',
                      language: 'Hinglish',
                      dialogue: '',
                      status: 'draft',
                    });
                    setActiveTab('scripts');
                  }}
                  className="p-4 bg-[#080B09] hover:bg-[#152018] border border-[#1A221C] hover:border-[#39FF78]/40 rounded text-left transition-all"
                >
                  <Clapperboard className="w-4 h-4 text-[#39FF78] mb-2" />
                  <div className="font-bold text-[#F5F7F5]">Script Studio Draft</div>
                  <div className="text-[10px] text-[#A2AAA4]">Scene breakdown & audio</div>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="p-4 bg-[#080B09] hover:bg-[#152018] border border-[#1A221C] hover:border-[#39FF78]/40 rounded text-left transition-all"
                >
                  <Mail className="w-4 h-4 text-[#39FF78] mb-2" />
                  <div className="font-bold text-[#F5F7F5]">Review Leads</div>
                  <div className="text-[10px] text-[#A2AAA4]">{newInquiriesCount} new briefs</div>
                </button>
              </div>
            </div>

            {/* Recent Content Log */}
            <div className="p-6 bg-[#0E1310] border border-[#1A221C] rounded-lg space-y-4">
              <h3 className="font-bold text-base text-[#F5F7F5] font-mono uppercase tracking-wider text-[#39FF78]">
                Recent Content Updates
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {contentList.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#080B09] border border-[#1A221C] rounded flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-[#F5F7F5] truncate max-w-xs">{item.title}</div>
                      <div className="text-[10px] text-[#A2AAA4]">
                        {item.type.toUpperCase()} · Cast: {item.character_featured}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        item.status === 'published'
                          ? 'bg-[#14261A] text-[#39FF78] border border-[#39FF78]/30'
                          : 'bg-[#261E14] text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================================
          TAB 2: CONTENT EDITOR & PUBLISHING HUB
          ============================================================================== */}
      {activeTab === 'content' && (
        <div className="space-y-8">
          {editingContent ? (
            /* Content Edit / Create Form */
            <form onSubmit={handleSaveContent} className="p-8 bg-[#0E1310] border border-[#1A221C] rounded-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1A221C]">
                <h3 className="text-xl font-bold font-editorial text-[#F5F7F5]">
                  {editingContent.id ? 'Edit Content Item' : 'Create New Content Entry'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingContent(null)}
                  className="text-xs font-mono text-[#A2AAA4] hover:text-[#F5F7F5]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingContent.title || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>

                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Slug (URL Path)</label>
                  <input
                    type="text"
                    value={editingContent.slug || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, slug: e.target.value })}
                    placeholder="auto-generated-if-empty"
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 font-mono text-xs">
                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Type</label>
                  <select
                    value={editingContent.type || 'blog'}
                    onChange={(e) => setEditingContent({ ...editingContent, type: e.target.value as any })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  >
                    <option value="blog">Blog Article</option>
                    <option value="reel">Reel / Short (1m)</option>
                    <option value="video">Film / Longform (10m+)</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="skit">Character Skit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Publishing Status</label>
                  <select
                    value={editingContent.status || 'draft'}
                    onChange={(e) => setEditingContent({ ...editingContent, status: e.target.value as PublishingStatus })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  >
                    <option value="draft">Draft (Internal)</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published (Live)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Aspect Ratio</label>
                  <select
                    value={editingContent.aspect_ratio || '16:9'}
                    onChange={(e) => setEditingContent({ ...editingContent, aspect_ratio: e.target.value as any })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  >
                    <option value="16:9">16:9 (Landscape)</option>
                    <option value="9:16">9:16 (Reel / Vertical)</option>
                    <option value="1:1">1:1 (Square)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Featured Character</label>
                  <select
                    value={editingContent.character_featured || 'altrox'}
                    onChange={(e) => setEditingContent({ ...editingContent, character_featured: e.target.value as CharacterId })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  >
                    <option value="altrox">Altrox (Tech)</option>
                    <option value="thamos">Thamos (VFX)</option>
                    <option value="chutki">Chutki (Viral)</option>
                    <option value="ensemble">Ensemble Cast</option>
                  </select>
                </div>
              </div>

              <div className="font-mono text-xs">
                <label className="block text-[#A2AAA4] uppercase mb-1">Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={editingContent.excerpt || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, excerpt: e.target.value })}
                  className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                />
              </div>

              <div className="font-mono text-xs">
                <label className="block text-[#A2AAA4] uppercase mb-1">Body Content (Markdown Supported) *</label>
                <textarea
                  rows={8}
                  required
                  value={editingContent.body || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, body: e.target.value })}
                  className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5] font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs pt-4 border-t border-[#1A221C]">
                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">SEO Title Override</label>
                  <input
                    type="text"
                    value={editingContent.seo_title || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, seo_title: e.target.value })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>
                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">SEO Description</label>
                  <input
                    type="text"
                    value={editingContent.seo_description || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, seo_description: e.target.value })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingContent(null)}
                  className="px-5 py-2.5 bg-[#141A16] text-[#A2AAA4] font-mono text-xs rounded hover:text-[#F5F7F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#39FF78] hover:bg-[#20A04B] text-[#080A09] font-mono font-bold text-xs uppercase tracking-wider rounded"
                >
                  SAVE & PUBLISH
                </button>
              </div>
            </form>
          ) : (
            /* Content List View */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-[#F5F7F5]">Published & Draft Content</h3>
                <button
                  onClick={() =>
                    setEditingContent({
                      title: '',
                      type: 'blog',
                      status: 'published',
                      body: '',
                      character_featured: 'altrox',
                    })
                  }
                  className="flex items-center space-x-1.5 px-4 py-2 bg-[#39FF78] text-[#080A09] font-mono font-bold text-xs uppercase rounded"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Entry</span>
                </button>
              </div>

              <div className="bg-[#0E1310] border border-[#1A221C] rounded-lg overflow-hidden">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[#080B09] text-[#A2AAA4] border-b border-[#1A221C]">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Character</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A221C] text-[#F5F7F5]">
                    {contentList.map((item) => (
                      <tr key={item.id} className="hover:bg-[#121A14] transition-colors">
                        <td className="p-4 font-bold">{item.title}</td>
                        <td className="p-4 text-[#A2AAA4] uppercase">{item.type}</td>
                        <td className="p-4 text-[#39FF78] capitalize">{item.character_featured}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              item.status === 'published'
                                ? 'bg-[#14261A] text-[#39FF78]'
                                : 'bg-[#261E14] text-amber-400'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingContent(item)}
                            className="p-1.5 hover:text-[#39FF78] transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteContent(item.id)}
                            className="p-1.5 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==============================================================================
          TAB 3: SCRIPT STUDIO (Phase 7 Video Production Pipeline)
          ============================================================================== */}
      {activeTab === 'scripts' && (
        <div className="space-y-8">
          {editingScript ? (
            /* Script Editor Form */
            <form onSubmit={handleSaveScript} className="p-8 bg-[#0E1310] border border-[#1A221C] rounded-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1A221C]">
                <div>
                  <span className="font-mono text-xs text-[#39FF78]">/ Script Studio v2.4</span>
                  <h3 className="text-xl font-bold font-editorial text-[#F5F7F5] mt-1">
                    {editingScript.id ? 'Edit Video Script' : 'Compose Production Script'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingScript(null)}
                  className="text-xs font-mono text-[#A2AAA4] hover:text-[#F5F7F5]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Script Title *</label>
                  <input
                    type="text"
                    required
                    value={editingScript.title || ''}
                    onChange={(e) => setEditingScript({ ...editingScript, title: e.target.value })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>

                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Concept Summary</label>
                  <input
                    type="text"
                    value={editingScript.description || ''}
                    onChange={(e) => setEditingScript({ ...editingScript, description: e.target.value })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>
              </div>

              {/* Form Controls: Duration, Aspect Ratio, Character, Language */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Duration</label>
                  <select
                    value={editingScript.duration || '1m'}
                    onChange={(e) => setEditingScript({ ...editingScript, duration: e.target.value as any })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  >
                    <option value="1m">1 Minute (Reel/Short)</option>
                    <option value="10m">10 Minutes (Mini-Film)</option>
                    <option value="60m">60 Minutes (Documentary)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Aspect Ratio</label>
                  <select
                    value={editingScript.aspect_ratio || '9:16'}
                    onChange={(e) => setEditingScript({ ...editingScript, aspect_ratio: e.target.value as any })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  >
                    <option value="9:16">9:16 (Vertical)</option>
                    <option value="16:9">16:9 (Landscape)</option>
                    <option value="1:1">1:1 (Square)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Lead Character</label>
                  <select
                    value={editingScript.character || 'Altrox'}
                    onChange={(e) => setEditingScript({ ...editingScript, character: e.target.value as any })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  >
                    <option value="Altrox">Altrox (Tech)</option>
                    <option value="Thamos">Thamos (VFX)</option>
                    <option value="Chutki">Chutki (Viral)</option>
                    <option value="Ensemble">Ensemble Cast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Language Dialect</label>
                  <input
                    type="text"
                    value={editingScript.language || 'Hinglish'}
                    onChange={(e) => setEditingScript({ ...editingScript, language: e.target.value })}
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>
              </div>

              {/* Dialogue & Voiceover */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Script Dialogue</label>
                  <textarea
                    rows={6}
                    value={editingScript.dialogue || ''}
                    onChange={(e) => setEditingScript({ ...editingScript, dialogue: e.target.value })}
                    placeholder="Thamos: 'Render chalu hai...'"
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>

                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Voiceover / Narration</label>
                  <textarea
                    rows={6}
                    value={editingScript.voiceover || ''}
                    onChange={(e) => setEditingScript({ ...editingScript, voiceover: e.target.value })}
                    placeholder="Narrator voiceover..."
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>
              </div>

              {/* Audio & Thumbnail Strategy */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-mono text-xs">
                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Sound Effects (SFX)</label>
                  <input
                    type="text"
                    value={editingScript.sound_effects || ''}
                    onChange={(e) => setEditingScript({ ...editingScript, sound_effects: e.target.value })}
                    placeholder="Riser, sub drop, glitch"
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>
                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Background Music (BGM)</label>
                  <input
                    type="text"
                    value={editingScript.background_music || ''}
                    onChange={(e) => setEditingScript({ ...editingScript, background_music: e.target.value })}
                    placeholder="Cyberpunk Phonk 130 BPM"
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>
                <div>
                  <label className="block text-[#A2AAA4] uppercase mb-1">Thumbnail Concept</label>
                  <input
                    type="text"
                    value={editingScript.thumbnail_concept || ''}
                    onChange={(e) => setEditingScript({ ...editingScript, thumbnail_concept: e.target.value })}
                    placeholder="Shocked reaction with glowing green wireframe"
                    className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingScript(null)}
                  className="px-5 py-2.5 bg-[#141A16] text-[#A2AAA4] font-mono text-xs rounded hover:text-[#F5F7F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#39FF78] hover:bg-[#20A04B] text-[#080A09] font-mono font-bold text-xs uppercase tracking-wider rounded"
                >
                  SAVE SCRIPT TO STUDIO
                </button>
              </div>
            </form>
          ) : (
            /* Scripts List */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#F5F7F5]">Video Production Scripts</h3>
                  <p className="text-xs font-mono text-[#A2AAA4]">
                    Pre-production studio for Reels, character skits, and 10-minute documentaries.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingScript({
                      title: '',
                      duration: '1m',
                      aspect_ratio: '9:16',
                      character: 'Chutki',
                      language: 'Hinglish',
                      status: 'draft',
                    })
                  }
                  className="flex items-center space-x-1.5 px-4 py-2 bg-[#39FF78] text-[#080A09] font-mono font-bold text-xs uppercase rounded"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Draft New Script</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scriptsList.map((script) => (
                  <div
                    key={script.id}
                    className="p-6 bg-[#0E1310] border border-[#1A221C] rounded-lg space-y-4 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-[#1A221C] pb-3">
                      <span className="text-[#39FF78] font-bold">{script.duration} · {script.aspect_ratio}</span>
                      <span className="px-2 py-0.5 bg-[#152018] border border-[#39FF78]/30 rounded text-[#39FF78] text-[10px] uppercase">
                        {script.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#F5F7F5] font-sans">{script.title}</h4>
                      <p className="text-[11px] text-[#A2AAA4] mt-1">{script.description}</p>
                    </div>

                    <div className="space-y-1 text-[11px] text-[#A2AAA4] bg-[#080B09] p-3 rounded border border-[#161F18]">
                      <div><strong>Lead Character:</strong> <span className="text-[#39FF78]">{script.character}</span></div>
                      <div><strong>Language:</strong> {script.language}</div>
                      <div><strong>SFX:</strong> {script.sound_effects || 'None set'}</div>
                      <div><strong>BGM:</strong> {script.background_music || 'None set'}</div>
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-2">
                      <button
                        onClick={() => setEditingScript(script)}
                        className="px-3 py-1 bg-[#17221A] hover:bg-[#233327] text-[#39FF78] rounded text-[11px]"
                      >
                        Edit Script
                      </button>
                      <button
                        onClick={() => handleDeleteScript(script.id)}
                        className="px-3 py-1 bg-[#221414] hover:bg-[#331C1C] text-red-400 rounded text-[11px]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==============================================================================
          TAB 4: INQUIRIES HUB
          ============================================================================== */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-[#F5F7F5]">Inbound Client Briefs</h3>
            <span className="text-xs font-mono text-[#A2AAA4]">Total Inquiries: {inquiriesList.length}</span>
          </div>

          <div className="space-y-4">
            {inquiriesList.map((inq) => (
              <div
                key={inq.id}
                className="p-6 bg-[#0E1310] border border-[#1A221C] rounded-lg space-y-4 font-mono text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1A221C] pb-3 gap-2">
                  <div>
                    <span className="text-sm font-bold text-[#F5F7F5] font-sans">{inq.full_name}</span>
                    <span className="text-[#A2AAA4] ml-2">({inq.email})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-[#A2AAA4]">{new Date(inq.created_at).toLocaleString()}</span>
                    <select
                      value={inq.status}
                      onChange={(e) => handleUpdateInquiry(inq.id, e.target.value as any)}
                      className="bg-[#080B09] border border-[#1C251E] rounded px-2 py-1 text-[#39FF78] text-[10px] uppercase font-bold"
                    >
                      <option value="new">New</option>
                      <option value="in_review">In Review</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] text-[#A2AAA4]">
                  <div><strong>Company:</strong> {inq.company || 'N/A'}</div>
                  <div><strong>Phone:</strong> {inq.phone || 'N/A'}</div>
                  <div><strong>Service:</strong> <span className="text-[#39FF78]">{inq.service_interest}</span></div>
                  <div><strong>Budget:</strong> <span className="text-[#F5F7F5]">{inq.budget_range}</span></div>
                </div>

                <div className="bg-[#080B09] p-4 rounded border border-[#161F18] text-[#F5F7F5] whitespace-pre-wrap leading-relaxed">
                  {inq.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==============================================================================
          TAB 5: MEDIA LIBRARY
          ============================================================================== */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1A221C]">
            <div>
              <h3 className="font-bold text-lg text-[#F5F7F5]">Media Assets & 3D Artwork</h3>
              <p className="text-xs font-mono text-[#A2AAA4]">Official generated assets in /public/assets.</p>
            </div>
            <button
              onClick={() => notify('Asset upload slot active. Drag and drop file to public/assets.')}
              className="flex items-center space-x-1.5 px-4 py-2 bg-[#39FF78] text-[#080A09] font-mono font-bold text-xs uppercase rounded"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Asset</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: 'altrox-character.jpg', role: 'Altrox (Tech Visionary)', path: '/assets/altrox-character.jpg' },
              { name: 'thamos-character.jpg', role: 'Thamos (3D & VFX)', path: '/assets/thamos-character.jpg' },
              { name: 'chutki-character.jpg', role: 'Chutki (Viral Narrative)', path: '/assets/chutki-character.jpg' },
              { name: 'hero-3d-monolith.jpg', role: 'Hero 3D Obsidian Monolith', path: '/assets/hero-3d-monolith.jpg' },
            ].map((media) => (
              <div key={media.name} className="bg-[#0E1310] border border-[#1A221C] rounded-lg overflow-hidden group">
                <div className="aspect-square bg-black overflow-hidden relative">
                  <img src={media.path} alt={media.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-3 font-mono text-xs">
                  <div className="font-bold text-[#F5F7F5] truncate">{media.name}</div>
                  <div className="text-[10px] text-[#39FF78] mt-0.5">{media.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==============================================================================
          TAB 6: SITE SETTINGS
          ============================================================================== */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="p-8 bg-[#0E1310] border border-[#1A221C] rounded-lg space-y-6 font-mono text-xs">
          <div className="border-b border-[#1A221C] pb-4">
            <h3 className="text-xl font-bold font-editorial text-[#F5F7F5]">Global Studio Settings</h3>
            <p className="text-[#A2AAA4] mt-1">Configure brand details, direct contacts, and kinetic tickers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[#A2AAA4] uppercase mb-1">Brand Name</label>
              <input
                type="text"
                value={settings.brand_name}
                onChange={(e) => setSettings({ ...settings, brand_name: e.target.value })}
                className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
              />
            </div>
            <div>
              <label className="block text-[#A2AAA4] uppercase mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[#A2AAA4] uppercase mb-1">Primary Email</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
              />
            </div>
            <div>
              <label className="block text-[#A2AAA4] uppercase mb-1">Primary Phone</label>
              <input
                type="text"
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                className="w-full bg-[#080B09] border border-[#1C251E] rounded p-2.5 text-[#F5F7F5]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#39FF78] hover:bg-[#20A04B] text-[#080A09] font-bold text-xs uppercase tracking-wider rounded"
          >
            UPDATE SETTINGS
          </button>
        </form>
      )}
    </div>
  );
}
