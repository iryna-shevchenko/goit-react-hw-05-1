import { LiaSearchSolid } from 'react-icons/lia';
import css from './SearchForm.module.css';

export default function SearchForm({ value, onChange, onSubmit }) {
  return (
    <form className={css.form} onSubmit={onSubmit}>
      <div className={css.inputWrapper}>
        <input
          className={css.input}
          name="search"
          type="text"
          placeholder="Movies search..."
          value={value}
          onChange={onChange}
        />
        <button className={css.searchBtn} type="submit">
          <LiaSearchSolid size={24} />
        </button>
      </div>
    </form>
  );
}
