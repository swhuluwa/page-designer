
namespace pdesigner {
    export interface ComponentToolbarProps extends React.Props<ComponentToolbar> {
        componets: ComponentDefine[],
        style?: React.CSSProperties,
        className?: string,
    }
    export interface ComponentToolbarState {

    }
    export class ComponentToolbar extends React.Component<ComponentToolbarProps, ComponentToolbarState> {
        designer: PageDesigner;
        private toolbarElement: HTMLElement;

        static connectorElementClassName = 'control-container';

        componentDidMount() {
            this.draggable($(`.${ComponentToolbar.connectorElementClassName}`));
            this.designer.controlComponentDidMount.add((sender, control) => {
                console.assert(control.element != null);
                this.draggable($(control.element));
            })
        }

        draggable(selector: JQuery) {
            $(this.toolbarElement).find('li').draggable({
                connectToSortable: $(`section, .${ComponentToolbar.connectorElementClassName}`),
                helper: "clone",
                revert: "invalid"
            })

            // this.props.componets.forEach(o => this.designer.addComponentDefine(o));
        }

        render() {
            let props = {};

            for (let k in this.props) {
                if (k == 'componets')
                    continue;

                props[k] = this.props[k];
            }

            let componets = this.props.componets;
            return <DesignerContext.Consumer>
                {context => {
                    this.designer = context.designer;
                    return <div {...props} className="component-panel panel panel-primary">
                        <div className="panel-heading">工具栏</div>
                        <div className="panel-body">
                            <ul ref={(e: HTMLElement) => this.toolbarElement = this.toolbarElement || e}>
                                {componets.map((c, i) => <li key={i} data-control-name={c.name}>
                                    <div className="btn-link">
                                        <i className={c.icon} style={{ fontSize: 44, color: 'black' }} />
                                    </div>
                                    <div>
                                        {c.displayName}
                                    </div>
                                </li>)}
                            </ul>
                        </div>
                    </div>
                }}
            </DesignerContext.Consumer>
        }
    }
}