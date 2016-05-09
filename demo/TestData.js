import moment from 'moment';

export default {
    getEvents: () => {
        const now = moment();
        const dataFormat = 'YYYY-MM-DD';
        const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.';
        const eventMeta = [
            {
                start: 1,
                length: 5,
            },
            {
                start: 5,
                length: 1,
            },
            {
                start: 5,
                length: 3,
            },
            {
                start: 12,
                length: 15,
            },
            {
                start: 15,
                length: 45,
            },
            {
                start: 18,
                length: 6,
            },
            {
                start: 21,
                length: 5,
            },
            {
                start: 24,
                length: 14,
            },
            {
                start: 25,
                length: 9,
            },
        ]


        const events = eventMeta.map((data) => {
            const today = moment(now);

            return {
                 start: today.date(data.start).format(dataFormat),
                 end: today.add(data.length-1, 'days').format(dataFormat),
                 eventClasses: 'custom-event-class',
                 title: data.length + ' day event ' + (data.title || ''),
                 description: description
            }
        }) 

        return events;
    }
};
