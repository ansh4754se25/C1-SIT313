import { useState } from 'react';

const emptyForm = {
  title: '',
  question: '',
  abstract: '',
  article: '',
  tags: '',
};

function validateTags(value) {
  const tags = value.split(',').map((tag) => tag.trim()).filter(Boolean);

  if (tags.length > 3) return 'Use no more than three tags.';
  if (tags.some((tag) => tag.length < 2 || tag.length > 24)) {
    return 'Each tag must be 2–24 characters.';
  }
  if (tags.some((tag) => !/^[\p{L}\p{N}+#.-]+$/u.test(tag))) {
    return 'Tags can use letters, numbers, +, #, . or -; don’t include spaces.';
  }

  return '';
}

export default function PostPage() {
  const [postType, setPostType] = useState('question');
  const [form, setForm] = useState(emptyForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const title = form.title.trim();
    const question = form.question.trim();
    const abstract = form.abstract.trim();
    const article = form.article.trim();
    const tagError = validateTags(form.tags);

    let error = tagError;

    if (!error && (title.length < 8 || title.length > 120)) {
      error = 'The title must be 8–120 characters.';
    } else if (!error && postType === 'question' &&
               (question.length < 20 || question.length > 5000)) {
      error = 'Describe the problem in 20–5,000 characters.';
    } else if (!error && postType === 'article' &&
               (abstract.length < 30 || abstract.length > 500)) {
      error = 'The abstract must be 30–500 characters.';
    } else if (!error && postType === 'article' &&
               (article.length < 100 || article.length > 10000)) {
      error = 'The article text must be 100–10,000 characters.';
    }

    if (error) {
      window.alert(error);
      return;
    }

    window.alert(`Your ${postType} has been sent!`);
    setForm(emptyForm);
  }

  return (
    <main className="post-page">
      <section className="post-panel">
        <h1>New Post</h1>

        <fieldset className="post-type-row">
          <legend>Select Post Type</legend>

          <label>
            <input
              type="radio"
              name="postType"
              checked={postType === 'question'}
              onChange={() => setPostType('question')}
            />
            Question
          </label>

          <label>
            <input
              type="radio"
              name="postType"
              checked={postType === 'article'}
              onChange={() => setPostType('article')}
            />
            Article
          </label>
        </fieldset>

        <h2 className="post-section-heading">What do you want to ask or share?</h2>

        <form className="post-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              minLength={8}
              maxLength={120}
              required
              placeholder={
                postType === 'question'
                  ? 'Start your question with how, what, or why'
                  : 'Enter a descriptive title'
              }
            />
          </label>

          {postType === 'question' ? (
            <label>
              Describe your problem
              <textarea
                name="question"
                value={form.question}
                onChange={handleChange}
                minLength={20}
                maxLength={5000}
                required
                placeholder="Include what you tried and what happened."
              />
            </label>
          ) : (
            <>
              <label>
                Abstract
                <textarea
                  name="abstract"
                  value={form.abstract}
                  onChange={handleChange}
                  minLength={30}
                  maxLength={500}
                  required
                  placeholder="Summarise your article in one paragraph."
                />
              </label>

              <label>
                Article Text
                <textarea
                  name="article"
                  value={form.article}
                  onChange={handleChange}
                  minLength={100}
                  maxLength={10000}
                  required
                  placeholder="Write your article here."
                />
              </label>
            </>
          )}

          <label>
            Tags
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Up to 3 tags, separated by commas (e.g. Java, React)"
            />
          </label>

          <button type="submit">Post</button>
        </form>
      </section>
    </main>
  );
}