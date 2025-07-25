export async function matchService([playerWeapon, opponentWeapon]) {
  const URL = `/api/v1/match?object_one=${playerWeapon}&object_two=${opponentWeapon}`;
  const HOST = import.meta.env.PROD && 'https://rps101.pythonanywhere.com';

  try {
    const response = await fetch(HOST + URL);

    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error: ', error);

    throw new Error('Something went wrong!');
  }
}
