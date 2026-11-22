/** Placeholder profile data until the baby/caregiver backend exists. */
export const useBabyProfile = () => ({
  baby: {
    name: 'Maya',
    ageLabel: '3 mo',
    weightLabel: '5.8 kg',
    week: 12, // TODO: derive from birth date
    avatarUrl: '/img/baby-img-01.png',
  },
  caregiver: { name: 'Alex' },
})
