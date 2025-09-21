import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart, Book, Target, Settings, ArrowRight, Lightbulb, CheckCircle, Star, User, BookOpen, Edit3, Clock, GraduationCap
} from 'lucide-react';
import { course } from './courseData';

// ---------- helpers: safe localStorage ----------
const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
const lsGetJSON = (key, fallback) => {
  if (!isBrowser) return fallback;
  try { const raw = window.localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
};
const lsGet = (key, fallback = '') => (!isBrowser ? fallback : (window.localStorage.getItem(key) ?? fallback));
const lsSet = (key, value) => { if (!isBrowser) return; window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)); };

// ---------- app ----------
const PersonalGospelApp = () => {
  const [currentTab, setCurrentTab] = useState('course'); // default to course
  const [theme, setTheme] = useState('light');

  // Study/notes (kept from your demo screens)
  const [currentSection, setCurrentSection] = useState('garden-gethsemane');
  const [studyNotes, setStudyNotes] = useState({});
  const [personalInsights, setPersonalInsights] = useState({});
  const [applicationCommitments, setApplicationCommitments] = useState({});
  const [completedSections, setCompletedSections] = useState(new Set());
  const [dailyReflection, setDailyReflection] = useState('');

  // Course progress
  // completedLessons: { [lessonId]: true }, notes: { [lessonId]: "..." }, checkpoints: { [lessonId]: "..." }
  const [completedLessons, setCompletedLessons] = useState({});
  const [lessonNotes, setLessonNotes] = useState({});
  const [lessonCheckpoints, setLessonCheckpoints] = useState({});
  const [activeLessonId, setActiveLessonId] = useState(null);

  useEffect(() => {
    setTheme(lsGet('theme', 'light'));

    // prior demo state
    setStudyNotes(lsGetJSON('studyNotes', {}));
    setPersonalInsights(lsGetJSON('personalInsights', {}));
    setApplicationCommitments(lsGetJSON('applicationCommitments', {}));
    setCompletedSections(new Set(lsGetJSON('completedSections', [])));
    setDailyReflection(lsGet('dailyReflection', ''));

    // course state
    setCompletedLessons(lsGetJSON('completedLessons', {}));
    setLessonNotes(lsGetJSON('lessonNotes', {}));
    setLessonCheckpoints(lsGetJSON('lessonCheckpoints', {}));
    setActiveLessonId(lsGet('activeLessonId', null));
  }, []);

  const saveCourse = (k, v) => lsSet(k, v);

  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    parchment: 'bg-amber-50 text-amber-900'
  };
  const cardClasses = {
    light: 'bg-white border-gray-200 shadow-sm',
    dark: 'bg-gray-800 border-gray-700',
    parchment: 'bg-amber-100 border-amber-200'
  };

  // --- Course helpers ---
  const flatLessons = useMemo(() => course.modules.flatMap(m => m.lessons.map(l => ({...l, moduleId: m.id, moduleTitle: m.title}))), []);
  const totalLessons = flatLessons.length;
  const doneCount = Object.values(completedLessons).filter(Boolean).length;
  const coursePct = Math.round((doneCount / totalLessons) * 100);

  const firstIncompleteLessonId = useMemo(() => {
    for (const m of course.modules) {
      for (const l of m.lessons) {
        if (!completedLessons[l.id]) return l.id;
      }
    }
    return course.modules[0].lessons[0].id; // all done => point to first
  }, [completedLessons]);

  const activeLesson = useMemo(() => flatLessons.find(l => l.id === activeLessonId) || flatLessons.find(l => l.id === firstIncompleteLessonId), [activeLessonId, firstIncompleteLessonId, flatLessons]);

  const goToNextLesson = () => {
    const idx = flatLessons.findIndex(l => l.id === activeLesson.id);
    if (idx >= 0 && idx < flatLessons.length - 1) {
      const nextId = flatLessons[idx + 1].id;
      setActiveLessonId(nextId);
      saveCourse('activeLessonId', nextId);
    }
  };
  const goToPrevLesson = () => {
    const idx = flatLessons.findIndex(l => l.id === activeLesson.id);
    if (idx > 0) {
      const prevId = flatLessons[idx - 1].id;
      setActiveLessonId(prevId);
      saveCourse('activeLessonId', prevId);
    }
  };

  const toggleCompleteLesson = (lessonId) => {
    const updated = { ...completedLessons, [lessonId]: !completedLessons[lessonId] };
    setCompletedLessons(updated);
    saveCourse('completedLessons', updated);
  };

  // --- Course UI ---
  const CourseOverview = () => (
    <div className="space-y-6 pb-24">
      <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-700" />
              {course.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{course.tagline}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-700">{coursePct}%</div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-4 mb-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${coursePct}%` }} />
        </div>

        <div className="text-xs text-gray-600 flex gap-4">
          <span>{course.modules.length} modules</span>
          <span>{totalLessons} lessons</span>
          <span>~{course.estDays} days • {course.estMinsPerDay} min/day</span>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => { setActiveLessonId(firstIncompleteLessonId); saveCourse('activeLessonId', firstIncompleteLessonId); setCurrentTab('course'); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            {doneCount ? 'Continue' : 'Start'} <ArrowRight className="w-4 h-4" />
          </button>
          {doneCount === totalLessons && (
            <a href="#certificate" className="px-4 py-2 rounded-lg border font-medium">View Certificate</a>
          )}
        </div>
      </div>

      {/* Module list */}
      {course.modules.map((m) => (
        <div key={m.id} className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-blue-900">{m.title}</h3>
            <span className="text-xs text-gray-600">
              {m.lessons.filter(l => completedLessons[l.id]).length}/{m.lessons.length} complete
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{m.summary}</p>

          <div className="space-y-2">
            {m.lessons.map((l) => (
              <button
                key={l.id}
                onClick={() => { setActiveLessonId(l.id); saveCourse('activeLessonId', l.id); }}
                className={`w-full p-4 rounded-lg text-left border flex items-center justify-between ${cardClasses[theme]}`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className={`w-4 h-4 ${completedLessons[l.id] ? 'text-green-600' : 'text-blue-700'}`} />
                  <div>
                    <div className="font-medium">{l.title}</div>
                    <div className="text-xs text-gray-600">{l.objective}</div>
                  </div>
                </div>
                {completedLessons[l.id] ? <CheckCircle className="w-5 h-5 text-green-600" /> : <ArrowRight className="w-4 h-4 text-gray-400" />}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const LessonView = () => {
    const l = activeLesson;
    if (!l) return null;

    const notesVal = lessonNotes[l.id] || '';
    const checkVal = lessonCheckpoints[l.id] || '';

    return (
      <div className="space-y-6 pb-28">
        <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs text-gray-500">{l.moduleTitle}</div>
              <h2 className="text-xl font-bold text-blue-900">{l.title}</h2>
            </div>
            {completedLessons[l.id] && <CheckCircle className="w-6 h-6 text-green-600" />}
          </div>
          <p className="text-sm text-gray-700">{l.objective}</p>
        </div>

        <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
          <div className="flex items-center gap-2 mb-3">
            <Book className="w-4 h-4 text-blue-700" />
            <h3 className="font-semibold text-blue-900">Read</h3>
          </div>
          <div className="space-y-2">
            {l.read.map((r) => (
              <div key={r.ref} className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                <span className="text-sm font-medium text-blue-900">— {r.ref}</span>
                <a href={r.deepLink} target="_blank" rel="noreferrer" className="text-xs text-blue-700 underline">Open</a>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Practice (Do)</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {l.practice.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                <span className="text-yellow-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-orange-600" />
            <h3 className="font-semibold text-orange-800">Checkpoint</h3>
          </div>
          <p className="text-sm text-gray-700 mb-2">{l.checkpoint}</p>
          <textarea
            value={checkVal}
            onChange={(e) => {
              const u = { ...lessonCheckpoints, [l.id]: e.target.value };
              setLessonCheckpoints(u); saveCourse('lessonCheckpoints', u);
            }}
            placeholder="Write 1–3 sentences…"
            className={`w-full h-20 p-3 rounded border resize-none text-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
          />
        </div>

        <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
          <div className="flex items-center gap-2 mb-3">
            <Edit3 className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Notes</h3>
          </div>
          <textarea
            value={notesVal}
            onChange={(e) => {
              const u = { ...lessonNotes, [l.id]: e.target.value };
              setLessonNotes(u); saveCourse('lessonNotes', u);
            }}
            placeholder="Insights, impressions, scriptures to revisit…"
            className={`w-full h-24 p-3 rounded border resize-none text-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button onClick={goToPrevLesson} className="px-4 py-2 rounded-lg border">Back</button>
          <div className="flex items-center gap-2">
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!completedLessons[l.id]}
                onChange={() => toggleCompleteLesson(l.id)}
              />
              Mark lesson complete
            </label>
            <button
              onClick={goToNextLesson}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- (Optional) original demo tabs kept for later: Goals/Library/Settings ---
  const GoalsScreen = () => (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Spiritual Goals</h2>
          <p className="text-sm text-gray-600">Tie your goals to your course</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">{Math.floor(coursePct/33)}/3</div>
          <div className="text-xs text-gray-500">Goals on track</div>
        </div>
      </div>

      <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
        <h3 className="text-lg font-bold text-blue-900 mb-4">Today’s Plan</h3>
        <p className="text-sm text-gray-700">Complete: <span className="font-semibold">{activeLesson?.title}</span></p>
        <p className="text-xs text-gray-500">~{course.estMinsPerDay} minutes</p>
      </div>
    </div>
  );

  const CourseScreen = () => (
    <div className="p-0">
      {!activeLesson ? <CourseOverview /> : <LessonView />}
    </div>
  );

  const SettingsScreen = () => (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Settings</h2>
      <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
        <h3 className="font-semibold mb-4">Appearance</h3>
        <div className="space-y-2">
          {[
            { value: 'light', label: 'Light Mode' },
            { value: 'dark', label: 'Dark Mode' },
            { value: 'parchment', label: 'Parchment Mode' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => { setTheme(value); lsSet('theme', value); }}
              className={`w-full p-3 rounded-lg border text-left ${theme === value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${themeClasses[theme]} font-sans`}>
      <div className="max-w-md mx-auto">
        <header className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-900 text-center">My Gospel Study</h1>
          <p className="text-sm text-gray-600 text-center mt-1">{course.title}</p>
        </header>

        <main className="p-6">
          {currentTab === 'course' && <CourseScreen />}
          {currentTab === 'goals' && <GoalsScreen />}
          {currentTab === 'settings' && <SettingsScreen />}
        </main>

        <nav className={`fixed bottom-0 left-0 right-0 ${cardClasses[theme]} border-t max-w-md mx-auto`}>
          <div className="flex">
            {[
              { id: 'course', label: 'Course', icon: GraduationCap },
              { id: 'goals', label: 'Goals', icon: Target },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentTab(id)}
                className={`flex-1 p-4 text-center ${currentTab === id ? 'text-blue-900' : 'text-gray-500'}`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default PersonalGospelApp;
