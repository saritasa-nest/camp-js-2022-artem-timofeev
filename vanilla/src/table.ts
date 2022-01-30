import { state } from './state';

// maping html elements for table
export const createTable = (tableBody): void => {
  const tableRowsWithFilmDataHtmlArr = state.filmsData.map(
    film =>
      ` <tr class="table-rows-with-films">
          <td class="mdl-data-table__cell--non-numeric">${film.fields.title}</td>
          <td>${film.fields.director}</td>
          <td>${film.fields.producer}</td>
          <td>${film.fields.release_date}</td>
        </tr>`,
  );
  tableBody.innerHTML = tableRowsWithFilmDataHtmlArr.join('');
};
