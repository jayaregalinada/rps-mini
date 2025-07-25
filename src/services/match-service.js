export async function matchService([playerWeapon, opponentWeapon]) {
  try {
    const response = await fetch(
      `/api/v1/match?object_one=${playerWeapon}&object_two=${opponentWeapon}`
    );

    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error: ', error);

    throw new Error('Something went wrong!');
  }
}
