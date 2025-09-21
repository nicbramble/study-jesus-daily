// High-level, practical course: "Following Jesus: Foundations"
export const course = {
  id: 'jesus-foundations',
  title: "Following Jesus: Foundations",
  tagline: "Learn Jesus’s life, teachings, atonement, and how to live as His disciple.",
  estDays: 10,
  estMinsPerDay: 20,
  modules: [
    {
      id: 'm1',
      title: 'Who Jesus Is',
      summary: "Identity, purpose, and why He matters personally.",
      lessons: [
        {
          id: 'm1l1',
          title: 'Jesus’s Identity',
          objective: "Understand core claims: Son of God, Messiah, Redeemer.",
          read: [
            { ref: 'John 1:1–14', deepLink: 'gospellibrary://content/scriptures/nt/john/1' },
            { ref: 'Matthew 16:13–17', deepLink: 'gospellibrary://content/scriptures/nt/matt/16' },
          ],
          practice: [
            "Write 2–3 sentences: Who is Jesus—to me?",
            "Pray and ask: “Help me know Thee better.”"
          ],
          checkpoint: "One sentence: What stood out most about His identity?"
        },
        {
          id: 'm1l2',
          title: 'Why He Came',
          objective: "Capture His mission in plain language.",
          read: [
            { ref: 'Luke 4:16–21', deepLink: 'gospellibrary://content/scriptures/nt/luke/4' },
            { ref: '3 Nephi 27:13–16', deepLink: 'gospellibrary://content/scriptures/bofm/3-ne/27' },
          ],
          practice: [
            "List 3 needs in your life His mission answers.",
            "Share one line with a friend: “Here’s why Jesus matters to me.”"
          ],
          checkpoint: "State His mission in one tweet-length sentence."
        },
        {
          id: 'm1l3',
          title: 'Meeting Him Personally',
          objective: "Move from information to relationship.",
          read: [
            { ref: 'Matthew 11:28–30', deepLink: 'gospellibrary://content/scriptures/nt/matt/11' },
            { ref: 'Alma 7:11–13', deepLink: 'gospellibrary://content/scriptures/bofm/alma/7' },
          ],
          practice: [
            "Try a 5-minute quiet prayer: Ask and then listen.",
            "Journal a fear and invite Him into it."
          ],
          checkpoint: "Record one way you felt nudged toward Him today."
        },
      ],
    },
    {
      id: 'm2',
      title: 'His Teachings',
      summary: "Sermon on the Mount, parables, and discipleship basics.",
      lessons: [
        {
          id: 'm2l1',
          title: 'Heart Posture (Beatitudes)',
          objective: "Adopt Christlike attitudes that invite the Spirit.",
          read: [
            { ref: 'Matthew 5:1–12', deepLink: 'gospellibrary://content/scriptures/nt/matt/5' },
          ],
          practice: [
            "Pick one Beatitude to live intentionally for 24 hours.",
            "Write what “blessed” could look like for you."
          ],
          checkpoint: "Which Beatitude are you practicing and why?"
        },
        {
          id: 'm2l2',
          title: 'Prayer, Fasting, Forgiveness',
          objective: "Learn the Lord’s Prayer rhythm and private devotion.",
          read: [
            { ref: 'Matthew 6:5–15', deepLink: 'gospellibrary://content/scriptures/nt/matt/6' },
          ],
          practice: [
            "Pray the Lord’s Prayer slowly, inserting your own words.",
            "Forgive one small debt/grievance today."
          ],
          checkpoint: "What changed when you prayed Jesus’s way?"
        },
        {
          id: 'm2l3',
          title: 'Building on the Rock',
          objective: "Act on teaching—not hear only.",
          read: [
            { ref: 'Matthew 7:24–27', deepLink: 'gospellibrary://content/scriptures/nt/matt/7' },
          ],
          practice: [
            "Identify one teaching to obey this week.",
            "Schedule it in your calendar."
          ],
          checkpoint: "Name your one act of obedience for this week."
        },
      ],
    },
    {
      id: 'm3',
      title: 'His Compassion & Power',
      summary: "Miracles that reveal His heart.",
      lessons: [
        {
          id: 'm3l1',
          title: 'Healing the Broken',
          objective: "See how compassion moves Him to act.",
          read: [
            { ref: 'Mark 5:22–34', deepLink: 'gospellibrary://content/scriptures/nt/mark/5' },
          ],
          practice: [
            "Reach out to someone suffering; send a text or visit.",
            "Ask: “Lord, how can I be Your hands today?”"
          ],
          checkpoint: "Who did you serve and how did it feel?"
        },
        {
          id: 'm3l2',
          title: 'Feeding the Hungry',
          objective: "Experience His abundance mindset.",
          read: [
            { ref: 'John 6:1–14', deepLink: 'gospellibrary://content/scriptures/nt/john/6' },
          ],
          practice: [
            "Share food/time with someone this week.",
            "Tithe/offer your “loaves & fishes” in prayer."
          ],
          checkpoint: "Where did you see God multiply small things?"
        },
        {
          id: 'm3l3',
          title: 'Power Over Storms',
          objective: "Trust Him in chaos.",
          read: [
            { ref: 'Mark 4:35–41', deepLink: 'gospellibrary://content/scriptures/nt/mark/4' },
          ],
          practice: [
            "Name a current storm and give it to Him.",
            "Practice breath prayer: “Peace, be still.”"
          ],
          checkpoint: "What is one fear that lost power today?"
        },
      ],
    },
    {
      id: 'm4',
      title: 'The Atonement: Gethsemane to Resurrection',
      summary: "How He saves us—and changes us.",
      lessons: [
        {
          id: 'm4l1',
          title: 'Gethsemane',
          objective: "Honor His suffering for you.",
          read: [
            { ref: 'Luke 22:39–44', deepLink: 'gospellibrary://content/scriptures/nt/luke/22' },
            { ref: 'D&C 19:16–19', deepLink: 'gospellibrary://content/scriptures/dc-testament/dc/19' },
          ],
          practice: [
            "5-minute gratitude prayer focused on His sacrifice.",
            "Write one habit you’ll surrender to Him."
          ],
          checkpoint: "What did you thank Him for—specifically?"
        },
        {
          id: 'm4l2',
          title: 'The Cross',
          objective: "Receive His forgiveness and offer it to others.",
          read: [
            { ref: 'Luke 23:33–46', deepLink: 'gospellibrary://content/scriptures/nt/luke/23' },
          ],
          practice: [
            "Confess one sin and accept His grace.",
            "Extend forgiveness to someone who hurt you."
          ],
          checkpoint: "How did receiving/forgiving change your heart?"
        },
        {
          id: 'm4l3',
          title: 'Resurrection',
          objective: "Live with hope and newness of life.",
          read: [
            { ref: 'John 20', deepLink: 'gospellibrary://content/scriptures/nt/john/20' },
          ],
          practice: [
            "Note one place you need resurrected hope.",
            "Celebrate with worship music or a psalm."
          ],
          checkpoint: "Where do you sense new life beginning?"
        },
      ],
    },
    {
      id: 'm5',
      title: 'Becoming His Disciple',
      summary: "Covenants, daily rhythms, and sharing Him.",
      lessons: [
        {
          id: 'm5l1',
          title: 'Take His Yoke',
          objective: "Craft sustainable daily discipleship.",
          read: [
            { ref: 'Matthew 11:28–30', deepLink: 'gospellibrary://content/scriptures/nt/matt/11' },
          ],
          practice: [
            "Set a daily rhythm: prayer + scripture + one act of love.",
            "Pick a time & place and add reminders."
          ],
          checkpoint: "What’s your daily rhythm (time/place/plan)?"
        },
        {
          id: 'm5l2',
          title: 'Covenants & Ordinances',
          objective: "See how covenants bind us to Him.",
          read: [
            { ref: 'Romans 6:3–5', deepLink: 'gospellibrary://content/scriptures/nt/rom/6' },
            { ref: '3 Nephi 18', deepLink: 'gospellibrary://content/scriptures/bofm/3-ne/18' },
          ],
          practice: [
            "Prepare for sacrament/communion with thoughtful prayer.",
            "Write a promise you’ll renew this week."
          ],
          checkpoint: "What covenant promise is most meaningful now?"
        },
        {
          id: 'm5l3',
          title: 'Go and Tell',
          objective: "Share Jesus naturally and kindly.",
          read: [
            { ref: 'Matthew 28:18–20', deepLink: 'gospellibrary://content/scriptures/nt/matt/28' },
          ],
          practice: [
            "Invite one person to pray or study with you.",
            "Share a simple testimony in 2–3 sentences."
          ],
          checkpoint: "Who will you invite and when?"
        },
      ],
    },
  ],
};
